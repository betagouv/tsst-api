import express, { Request, Response } from 'express';
import Joi from 'joi';
import { DATE_PATTERN } from './constants';
import { buildController } from './lib/buildController';
import { userController } from './modules/users';

export { router };

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
    res.sendStatus(200);
});

router.post(
    '/users',
    buildController(userController.insertManyUsers, {
        schema: Joi.array().items(
            Joi.object({
                studiesExpirationDate: Joi.string().regex(DATE_PATTERN),
                email: Joi.string().required(),
            }),
        ),
    }),
);
