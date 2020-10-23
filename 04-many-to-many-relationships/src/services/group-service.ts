import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { v4 as uuidv4 } from 'uuid';

import { responseGroupNotFoundHandler } from '../utility';
import { GroupDao } from '../dao';
import { CustomRequest } from '../api/model';

export const groupService = {
    processId: (
        req: CustomRequest,
        res: Response,
        next: NextFunction,
        id: string
    ) => {
        req.id = id;
        next();
    },

    getAllGroups: (req: CustomRequest, res: Response) => {
        GroupDao.getAllGroups()
            .then((groups) => {
                groups ? res.json(groups) : responseGroupNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    }
};
