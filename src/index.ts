import express, { Express, Request, Response } from 'express';
import { config } from './config';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(config.SERVER_PORT, () => {
    console.log(`Server is running at http://localhost:${config.SERVER_PORT}`);
});
