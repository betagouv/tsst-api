import express, { Request, Response } from 'express';

export { router };

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

router.post('/users', (req: Request, res: Response) => {
    console.log(req.body);
    res.sendStatus(200);
});
