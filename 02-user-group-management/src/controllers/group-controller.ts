import { Response, NextFunction } from 'express';

import { responseGroupNotFoundHandler } from '../utility';
import { CustomRequest } from '../api/model';
import { Group } from '../types';
import { GroupService } from '../services';
import { controllerErrorLogger } from '../logger';

const groupControllerErrorLogger = (
    method: string,
    args: any[],
    error: string
) => controllerErrorLogger('GroupController', method, args, error);

export class GroupController {
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
        GroupService.getAllGroups()
            .then((groups) => {
                groups ? res.json(groups) : responseGroupNotFoundHandler(res);
            })
            .catch((err) => {
                groupControllerErrorLogger('getAllGroups', [], err);
                res.status(400).json(err.message);
            });
    }

    getGroupById(req: CustomRequest, res: Response): void {
        const { id } = req.params;

        GroupService.getGroupById(id)
            .then((group) => {
                group ? res.json(group) : responseGroupNotFoundHandler(res);
            })
            .catch((err) => {
                groupControllerErrorLogger('getGroupById', [], err);
                res.status(400).json(err.message);
            });
    }

    deleteGroup(req: CustomRequest, res: Response): void {
        const { id } = req.params;

        GroupService.deleteGroup(id)
            .then((group) => {
                group ? res.json(group) : responseGroupNotFoundHandler(res);
            })
            .catch((err) => {
                groupControllerErrorLogger('deleteGroup', [], err);
                res.status(400).json(err.message);
            });
    }

    updateGroup(req: CustomRequest, res: Response): void {
        const { id } = req.params;
        const group = req.body as Group;

        GroupService.updateGroup(id, group)
            .then((result) => {
                res.json(`Group was updated: ${JSON.stringify(result)}`);
            })
            .catch((err) => {
                groupControllerErrorLogger('updateGroup', [], err);
                res.status(400).json(err.message);
            });
    }

    createGroup(req: CustomRequest, res: Response): void {
        const group = req.body as Group;

        GroupService.createGroup(group)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                groupControllerErrorLogger('createGroup', [], err);
                res.status(400).json(err.message);
            });
    }

    addUsersToGroup(req: CustomRequest, res: Response): any {
        const { groupId, userIds } = req.body;

        GroupService.addUsersToGroup(groupId, userIds)
            .then((result) => {
                result
                    ? res.json('Users were added to group')
                    : res.status(404).json('Users were not added to group');
            })
            .catch((err) => {
                groupControllerErrorLogger('addUsersToGroup', [], err);
                res.status(400).json(err.message);
            });
    }

    getUsersByGroupId(req: CustomRequest, res: Response): void {
        const { id } = req.params;

        GroupService.getUsersByGroupId(id)
            .then((data) => {
                data
                    ? res.json(data)
                    : res.status(404).json('Users not found by group id');
            })
            .catch((err) => {
                groupControllerErrorLogger('getUsersByGroupId', [], err);
                res.status(400).json(err.message);
            });
    }
}
