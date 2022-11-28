import { afterAll, beforeAll } from '@jest/globals';
import { dataSource } from './dataSource';
import { User } from './modules';

beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.runMigrations();
});

afterAll(async () => {
    await dataSource.destroy();
});
