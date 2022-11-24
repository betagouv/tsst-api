import express, { Express, Request, Response } from 'express';

export { app };

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});
