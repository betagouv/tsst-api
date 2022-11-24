import { config } from './config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './modules';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: ['dist/migration/*'],
    subscribers: [],
});
