import moment from 'moment';
import { dataSource } from '../dataSource';
import { generateRandomKey, hasher } from '../lib/crypto';
import { ApiKey } from '../modules';

async function generateApiKey() {
    await dataSource.initialize();

    const apiKey = 'tab_key_' + generateRandomKey();
    const hash = hasher.hash(apiKey);
    const expirationDate = moment().add(1, 'year').format('YYYY-MM-DD');
    const apiKeyRepository = dataSource.getRepository(ApiKey);
    const result = await apiKeyRepository.insert({ hash, expirationDate });
    console.log('Votre id est :', result.identifiers);
    console.log('Votre apiKey est :', apiKey);
}

generateApiKey();
