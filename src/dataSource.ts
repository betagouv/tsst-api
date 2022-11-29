import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';

export const dataSource = new DataSource({
    type: 'postgres',
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: ['dist/**/entity/*.js'],
    migrations: ['dist/migration/*'],
    subscribers: [],
});
