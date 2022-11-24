import Joi from 'joi';
import { dataSource } from '../../../dataSource';
import { User } from '../entity';
import { userDto } from './types';

export { insertManyUsers };

async function insertManyUsers(userDtos: userDto[]) {
    const schema = Joi.array().items(Joi.object({ email: Joi.string().required() }));
    const { error } = schema.validate(userDtos);
    if (error) {
        return { kind: 'error' as const, message: error.message, statusCode: 400 };
    }

    const userRepository = dataSource.getRepository(User);

    const users = userDtos.map((userDto) => ({ encryptedEmail: userDto.email }));

    const result = await userRepository.insert(users);

    return { kind: 'success' as const, data: { inserted: result.raw.length } };
}
