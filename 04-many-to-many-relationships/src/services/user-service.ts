import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { v4 as uuidv4 } from 'uuid';

import { CustomRequest } from '../api/model';
import { UserDao } from '../dao';
import { User } from '../types';
import { getAutoSuggestUsers, responseUserNotFoundHandler } from '../utility';

export class UserService {
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

    getAllUsers(req: CustomRequest, res: Response): void {
        UserDao.getAllUsers()
            .then((allUsers) => {
                allUsers
                    ? res.json(allUsers)
                    : responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    }

    getUser(req: CustomRequest, res: Response): void {
        const { id } = req.params;

        UserDao.getUserById(id)
            .then((user) => {
                user ? res.json(user) : responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    }

    deleteUser(req: CustomRequest, res: Response): void {
        const { id } = req.params;

        UserDao.deleteUser(id)
            .then((user) => {
                user ? res.json(user) : responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    }

    updateUser(req: CustomRequest, res: Response): void {
        const user = req.body as User;
        UserDao.updateUser(user)
            .then((result) => {
                res.json(`User was updated: ${JSON.stringify(result)}`);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    }

    createUser(req: CustomRequest, res: Response): void {
        const user = req.body as User;
        const id = uuidv4();
        user.id = id;
        UserDao.createUser(user)
            .then((result) => {
                res.json(`User was created: ${JSON.stringify(result)}`);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    }

    getSuggestedUsers(req: CustomRequest, res: Response): void {
        const substr = req.query.login_substring?.toString();
        const limit = Number.parseInt(
            req.query.limit?.toString() as string,
            10
        );

        if (substr && !isNaN(limit)) {
            UserDao.getAllUsers()
                .then((allUsers) => {
                    const suggestedUsers = getAutoSuggestUsers(
                        [...allUsers],
                        substr,
                        limit
                    );

                    allUsers
                        ? res.json(
                              `Suggested users ${JSON.stringify(
                                  suggestedUsers
                              )}`
                          )
                        : responseUserNotFoundHandler(res);
                })
                .catch((err) => {
                    res.status(400).json(err.message);
                });
        } else {
            res.status(400).json('Please enter correct parameters');
        }
    }
}
