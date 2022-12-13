import httpStatus from 'http-status';
import { dataSource } from '../../../dataSource';
import { routeType } from '../../../lib/buildController';
import { User } from '../entity';
import { userDto } from './types';

export { insertManyUsers };

async function insertManyUsers(userDtos: userDto[]): Promise<routeType> {
    const userRepository = dataSource.getRepository(User);

    const users = userDtos.map((userDto) => ({
        encryptedEmail: userDto.email,
        studiesExpirationDate: userDto.studiesExpirationDate,
    }));

    let result;
    try {
        result = await userRepository.insert(users);
    } catch (error: any) {
        console.error(error);
        return {
            kind: 'error',
            message: error.detail,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        };
    }

    return { kind: 'success', data: { inserted: result.raw.length } };
}
