import { Request, Response } from 'express';

export { buildController };

type routeType<T> = { kind: 'success'; data: T } | { kind: 'error'; message: string; statusCode: number };

function buildController<bodyT, dataT>(controller: (body: bodyT) => routeType<dataT> | Promise<routeType<dataT>>) {
    return async (req: Request, res: Response) => {
        try {
            const result = await controller(req.body);
            switch (result.kind) {
                case 'success':
                    res.send(result.data);
                    return;
                case 'error':
                    res.status(result.statusCode);
                    res.send(result.message);
                    return;
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    };
}
