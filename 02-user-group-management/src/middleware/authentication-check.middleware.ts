import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

const secret: string = process.env.PORT_NUMBER as string;

export const authenticationCheckMiddleware: any = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1] as string;

        jwt.verify(token, secret, (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
