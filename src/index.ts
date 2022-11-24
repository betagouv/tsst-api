import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { router } from './router';
import { config } from './config';
import { dataSource } from './data-source';

async function runApp() {
    const app: Express = express();

    try {
        await dataSource.initialize();
    } catch (error) {
        console.error(error);
    }

    app.use(bodyParser.json());

    app.use('/api', router);

    app.listen(config.SERVER_PORT, () => {
        console.log(`Server is running at http://localhost:${config.SERVER_PORT}`);
    });
}

runApp();
