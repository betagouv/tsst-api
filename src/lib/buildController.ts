import { Request, Response } from 'express';
import httpStatus from 'http-status';
import moment from 'moment';
import { dataSource } from '../dataSource';
import { ApiKey } from '../modules';
import { hasher } from './crypto';

export { buildController };

export type { routeType };

type routeType =
    | { kind: 'success'; data: any }
    | { kind: 'error'; message: string; statusCode: number };

function buildController<bodyT>(controller: (body: bodyT) => routeType | Promise<routeType>) {
    return async (req: Request, res: Response) => {
        const apiKey = (req.headers['x-api-key'] || '') as string;
        const apiKeyId = (req.headers['x-api-key-id'] || '') as string;
        if (!apiKeyId || !apiKey) {
            console.error(`No x-api-key or no x-api-key-id provided.`);
            res.sendStatus(httpStatus.UNAUTHORIZED);
            return;
        }
        const apiKeyRepository = dataSource.getRepository(ApiKey);
        const storedApiKey = await apiKeyRepository.findOneBy({ id: apiKeyId });
        if (!storedApiKey) {
            console.error(`x-api-key-id ${apiKeyId} does not exist in the database.`);
            res.sendStatus(httpStatus.UNAUTHORIZED);
            return;
        }
        if (moment(storedApiKey.expirationDate).isBefore(moment())) {
            console.error(`Api key expiration date is in the past: ${storedApiKey.expirationDate}`);
            res.sendStatus(httpStatus.UNAUTHORIZED);
            return;
        }
        if (!hasher.verify(apiKey, storedApiKey.hash)) {
            console.error(`Wrong x-api-key: ${apiKey}`);
            res.sendStatus(httpStatus.UNAUTHORIZED);
            return;
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
