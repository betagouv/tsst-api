import express, { Request, Response } from 'express';
import { userService } from './modules/users';

export { router };

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

router.post('/users', async (req: Request, res: Response) => {
    const users = req.body;

    const result = await userService.insertManyUsers(users);

    res.send(result);
});
