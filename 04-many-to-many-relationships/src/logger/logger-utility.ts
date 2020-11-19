import { NextFunction } from 'express';
import { CustomRequest } from '../api/model';
import { logger } from './logger';

function modifyLogMessage(body: Object): Object {
    const result = { ...body } as any;
    if (result && result.password) {
        result.password = '******';
    }
    return result;
}

export const httpInfoLogger: any = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): void => {
    logger.info(
        `${req.method} ${req.url}, body: ${JSON.stringify(
            modifyLogMessage(req.body)
        )}`
    );
    next();
};

export const controllerErrorLogger: any = (
    controller: string,
    method: string,
    args: any[],
    error: string
) => {
    logger.error(
        `${controller}.${method}(${args?.map((el) =>
            JSON.stringify(el)
        )}), error: ${error}`
    );
};
