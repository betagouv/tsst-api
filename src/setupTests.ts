import { afterAll, beforeAll } from '@jest/globals';
import { config } from './config';
import { dataSource } from './dataSource';
import { insertApiKey } from './scripts/insertApiKey';

beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.runMigrations();
    if (!config.LOCAL_API_KEY_ID || !config.LOCAL_API_KEY) {
        throw new Error('config.LOCAL_API_KEY_ID or config.LOCAL_API_KEY not defined');
    }
    await insertApiKey(config.LOCAL_API_KEY_ID, config.LOCAL_API_KEY);
});

afterAll(async () => {
    await dataSource.destroy();
});
