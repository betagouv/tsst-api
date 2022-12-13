import moment from 'moment';
import { dataSource } from '../dataSource';
import { hasher } from '../lib/crypto';
import { ApiKey } from '../modules';

export { insertApiKey };

async function insertApiKey(uuid: string, apiKey: string) {
    const hash = hasher.hash(apiKey);
    const expirationDate = moment().add(1, 'year').format('YYYY-MM-DD');
    const apiKeyRepository = dataSource.getRepository(ApiKey);
    try {
        await apiKeyRepository.insert({ id: uuid, hash, expirationDate });
    } catch (error) {}
}
