import { Request, Response } from 'express';

export { buildController };

type routeType = { kind: 'success'; data: any } | { kind: 'error'; message: string; statusCode: number };

function buildController<bodyT>(controller: (body: bodyT) => routeType | Promise<routeType>) {
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
