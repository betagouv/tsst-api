import dotenv from 'dotenv';

switch (process.env.NODE_ENV) {
    case 'test':
        dotenv.config({ path: '.env.test' });
        break;
    default:
        dotenv.config();
}

const config = {
    SERVER_PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    DATABASE_PORT: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 5432,
    DATABASE_HOST: process.env.DATABASE_HOST || '',
    DATABASE_NAME: process.env.DATABASE_NAME || '',
    DATABASE_USER: process.env.DATABASE_USER || '',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
};

export { config };
