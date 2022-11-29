import { afterAll, beforeAll } from '@jest/globals';
import { dataSource } from './dataSource';

beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.runMigrations();
});

afterAll(async () => {
    await dataSource.destroy();
});
