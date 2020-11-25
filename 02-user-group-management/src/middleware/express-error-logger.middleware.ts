import { Response, Request, NextFunction } from 'express';
import { logger } from '../logger';

export const expressErrorLoggerMiddleware: any = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    logger.error(`${req.method} ${req.url}: ${error}`);
    res.status(500).json(error.message);
};
