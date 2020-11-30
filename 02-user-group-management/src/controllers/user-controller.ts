import { Response } from 'express';

import { CustomRequest } from '../api/model';
import { controllerErrorLogger } from '../logger';
import { UserService } from '../services';
import { User } from '../types';
import { getAutoSuggestUsers, utility } from '../utility';

const userControllerErrorLogger = (
    method: string,
    args: any[],
    error: string
) => controllerErrorLogger('UserController', method, args, error);

export class UserController {
    constructor() {}

    getAllUsers(req: CustomRequest, res: Response): void {
        UserService.getAllUsers()
            .then((allUsers) => {
                allUsers
                    ? res.json(allUsers)
                    : utility.responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                userControllerErrorLogger('getAllUsers', [], err);
                res.status(400).json(err.message);
            });
    }

    getUser(req: CustomRequest, res: Response): void {
        const { id } = req.params;

        UserService.getUserById(id)
            .then((user) => {
                user
                    ? res.json(user)
                    : utility.responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                userControllerErrorLogger('getUser', [id], err);
                res.status(400).json(err.message);
            });
    }

    deleteUser(req: CustomRequest, res: Response): void {
        const { id } = req.params;

        UserService.deleteUser(id)
            .then((user) => {
                user
                    ? res.json(user)
                    : utility.responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                userControllerErrorLogger('deleteUser', [id], err);
                res.status(400).json(err.message);
            });
    }

    updateUser(req: CustomRequest, res: Response): void {
        const { id } = req.params;
        const user = req.body as User;

        UserService.updateUser(id, user)
            .then((result) => {
                res.json(`User was updated: ${JSON.stringify(result)}`);
            })
            .catch((err) => {
                userControllerErrorLogger('updateUser', [id, user], err);
                res.status(400).json(err.message);
            });
    }

    createUser(req: CustomRequest, res: Response): void {
        const user = req.body as User;

        UserService.createUser(user)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                userControllerErrorLogger('createUser', [user], err);
                res.status(400).json(err.message);
            });
    }

    getSuggestedUsers(req: CustomRequest, res: Response): void {
        const substr = req.query.login_substring?.toString();
        const limit = Number.parseInt(
            req.query.limit?.toString() as string,
            10
        );

        UserService.getSuggestedUsers()
            .then((allUsers) => {
                const suggestedUsers = getAutoSuggestUsers(
                    [...allUsers],
                    substr,
                    limit
                );

                allUsers
                    ? res.json(suggestedUsers)
                    : utility.responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                userControllerErrorLogger(
                    'getSuggestedUsers',
                    [substr, limit],
                    err
                );
                res.status(400).json(err.message);
            });
    }
}
