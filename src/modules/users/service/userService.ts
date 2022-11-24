import { dataSource } from '../../../dataSource';
import { userDto } from '../controller';
import { User } from '../entity';

export { userService };

const userService = { insertManyUsers };

async function insertManyUsers(userDtos: userDto[]) {
    const userRepository = dataSource.getRepository(User);

    const users = userDtos.map((userDto) => ({ encryptedEmail: userDto.email }));

    const result = await userRepository.insert(users);

    return { inserted: result.raw.length };
}
