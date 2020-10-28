import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { v4 as uuidv4 } from 'uuid';

import { responseGroupNotFoundHandler } from '../utility';
import { GroupDao } from '../dao';
import { CustomRequest } from '../api/model';
import { Group } from '../types';

export class GroupService {
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

    getAllGroups(req: CustomRequest, res: Response): void {
        GroupDao.getAllGroups()
            .then((groups) => {
                groups ? res.json(groups) : responseGroupNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    }

    getGroupById(req: CustomRequest, res: Response): void {
        const { id } = req.params;

        GroupDao.getGroupById(id)
            .then((group) => {
                group ? res.json(group) : responseGroupNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    }

    deleteGroup(req: CustomRequest, res: Response): void {
        const { id } = req.params;

        GroupDao.deleteGroup(id)
            .then((group) => {
                group ? res.json(group) : responseGroupNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    }

    updateGroup(schema: ObjectSchema): Function {
        return (req: CustomRequest, res: Response) => {
            const group = req.body as Group;
            const { error } = schema.validate(group);

            if (!error?.isJoi) {
                GroupDao.updateGroup(group)
                    .then((result) => {
                        console.log('AAA: result', result);

                        res.json(
                            `Group was updated: ${JSON.stringify(result)}`
                        );
                    })
                    .catch((err) => {
                        res.status(400).json(err.message);
                    });
            } else {
                res.status(400).json(
                    `Data is not valid: ${error.details[0]?.message}`
                );
            }
        };
    }

    createGroup(schema: ObjectSchema): Function {
        return (req: CustomRequest, res: Response) => {
            const group = req.body as Group;
            const { error } = schema.validate(group);
            if (!error?.isJoi) {
                const id = uuidv4();
                group.id = id;
                GroupDao.createGroup(group)
                    .then((result) => {
                        res.json(`Group was created: ${result}`);
                    })
                    .catch((err) => {
                        res.status(400).json(err.message);
                    });
            } else {
                res.status(400).json(
                    `Data is not valid: ${error.details[0]?.message}`
                );
            }
        };
    }

    addUsersToGroup(req: CustomRequest, res: Response): any {
        const { groupId, userIds } = req.body;

        console.log('GroupService: addUsersToGroup: groupId: ', groupId);
        console.log('GroupService: addUsersToGroup: userIds: ', userIds);

        GroupDao.addUsersToGroup(groupId, userIds)
            .then((group) => {
                group ? res.json(group) : responseGroupNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    }
}
