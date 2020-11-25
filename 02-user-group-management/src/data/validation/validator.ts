import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import { CustomRequest } from '../../api/model/custom-request';

export const validateBody = (schema: ObjectSchema): any => (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): void => {
    const value = req.body;
    const { error } = schema.validate(value);

    if (!error?.isJoi) {
        next();
    } else {
        res.status(400).json(`Data is not valid: ${error.details[0]?.message}`);
    }
};

export const validateQuery = (schema: ObjectSchema): any => (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): void => {
    const value = req.query;
    const { error } = schema.validate(value);

    if (!error?.isJoi) {
        next();
    } else {
        res.status(400).json(`Data is not valid: ${error.details[0]?.message}`);
    }
};
