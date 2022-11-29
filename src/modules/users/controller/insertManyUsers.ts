import httpStatus from 'http-status';
import Joi from 'joi';
import { dataSource } from '../../../dataSource';
import { routeType } from '../../../lib/buildController';
import { User } from '../entity';
import { userDto } from './types';

export { insertManyUsers };

const DATE_PATTERN = /^2[0-9]{3}-[0,1][0-9]-[0-3][0-9]$/;

async function insertManyUsers(userDtos: userDto[]): Promise<routeType> {
    const schema = Joi.array().items(
        Joi.object({
            studiesExpirationDate: Joi.string().regex(DATE_PATTERN),
            email: Joi.string().required(),
        }),
    );
    const { error } = schema.validate(userDtos);
    if (error) {
        return {
            kind: 'error' as const,
            message: error.message,
            statusCode: httpStatus.BAD_REQUEST,
        };
    }

    const userRepository = dataSource.getRepository(User);

    const users = userDtos.map((userDto) => ({
        encryptedEmail: userDto.email,
        studiesExpirationDate: userDto.studiesExpirationDate,
    }));

    let result;
    try {
        result = await userRepository.insert(users);
    } catch (error: any) {
        return { kind: 'error', message: error.detail, statusCode: httpStatus.CONFLICT };
    }

    return { kind: 'success', data: { inserted: result.raw.length } };
}
