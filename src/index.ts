import express, { Express, Request, Response } from 'express';
import { config } from './config';
import { AppDataSource } from './data-source';

async function runApp() {
    const app: Express = express();

    app.get('/', (req: Request, res: Response) => {
        res.send('Express + TypeScript Server');
    });

    try {
        await AppDataSource.initialize();
    } catch (error) {
        console.error(error);
    }

    app.listen(config.SERVER_PORT, () => {
        console.log(`Server is running at http://localhost:${config.SERVER_PORT}`);
    });
}

runApp();
