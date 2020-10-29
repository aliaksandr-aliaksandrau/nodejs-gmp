import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { v4 as uuidv4 } from 'uuid';

import { responseGroupNotFoundHandler } from '../utility';
import { GroupDao, UserGroupDao } from '../dao';
import { CustomRequest } from '../api/model';
import { Group } from '../types';

export class UserGroupService {
    constructor() {}

    processId(
        req: CustomRequest,
        res: Response,
        next: NextFunction,
        id: string
    ): void {
        req.id = id;
        next();
    }

    getUserIdsByGroupId(req: CustomRequest, res: Response): void {
        const { id } = req.params;

        UserGroupDao.getUserIdsByGroupId(id)
            .then((users) => {
                console.log('TTTTTTTTTTTTTTTTTT', users);

                users ? res.json(users) : responseGroupNotFoundHandler(res);
            })
            .catch((err) => {
              console.log('TTTTTTTTTTTTTTTTTT');
                res.status(400).json(err.message);
            });
    }
}
