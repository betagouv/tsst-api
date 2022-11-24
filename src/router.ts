import express, { Request, Response } from 'express';
import { buildController } from './lib/buildController';
import { userService } from './modules/users';

export { router };

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
    res.sendStatus(200);
});

router.post('/users', buildController(userService.insertManyUsers));
