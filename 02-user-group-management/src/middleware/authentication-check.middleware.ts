import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

const accessTokenSecret: string = 'secret';

export const authenticationCheckMiddleware: any = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    console.log('AAA: authenticationCheck: ', authHeader);

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            // req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
