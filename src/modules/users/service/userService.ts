import { dataSource } from '../../../dataSource';
import { User } from '../entity';
import { userDto } from './types';

export { userService };

const userService = { insertManyUsers };

async function insertManyUsers(userDtos: userDto[]) {
    const userRepository = dataSource.getRepository(User);

    const users = userDtos.map((userDto) => ({ encryptedEmail: userDto.email }));

    const result = await userRepository.insert(users);

    return { kind: 'success' as const, data: { inserted: result.raw.length } };
}
