import { dataSource } from '../../../data-source';
import { User } from '../entity';

export { userService };

const userService = { insertManyUsers };

async function insertManyUsers(users: User[]) {
    const userRepository = dataSource.getRepository(User);

    return userRepository.insert(users);
}
