import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import moment from 'moment';
import { dataSource } from '../dataSource';
import { ApiKey } from '../modules';
import { hasher } from './crypto';

export { buildController };

export type { routeType };

type routeType =
    | { kind: 'success'; data: any }
    | { kind: 'error'; message: string; statusCode: number };

function buildController<bodyT>(
    controller: (body: bodyT) => routeType | Promise<routeType>,
    options?: { schema?: Joi.Schema },
) {
    return async (req: Request, res: Response) => {
        try {
            await checkAuthentication(req);
        } catch (error) {
            console.error(error);
            res.sendStatus(httpStatus.UNAUTHORIZED);
            return;
        }
        if (options?.schema) {
            const { error } = options.schema.validate(req.body);
            if (error) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
                return;
            }
        }

        try {
            const result = await controller(req.body);
            switch (result.kind) {
                case 'success':
                    res.send(result.data);
                    return;
                case 'error':
                    res.status(result.statusCode);
                    res.send(result.message);
                    return;
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}

async function checkAuthentication(req: Request) {
    const apiKey = (req.headers['x-api-key'] || '') as string;
    const apiKeyId = (req.headers['x-api-key-id'] || '') as string;
    if (!apiKeyId || !apiKey) {
        throw new Error(`No x-api-key or no x-api-key-id provided.`);
    }
    const apiKeyRepository = dataSource.getRepository(ApiKey);
    const storedApiKey = await apiKeyRepository.findOneBy({ id: apiKeyId });
    if (!storedApiKey) {
        throw new Error(`x-api-key-id ${apiKeyId} does not exist in the database.`);
    }
    if (moment(storedApiKey.expirationDate).isBefore(moment())) {
        throw new Error(`Api key expiration date is in the past: ${storedApiKey.expirationDate}`);
    }
    if (!hasher.verify(apiKey, storedApiKey.hash)) {
        throw new Error(`Wrong x-api-key: ${apiKey}`);
    }
}
