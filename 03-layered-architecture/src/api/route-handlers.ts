import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { v4 as uuidv4 } from 'uuid';

import { responseUserNotFoundHandler, getAutoSuggestUsers } from '../utility';
import { User } from '../types/user';
import { CustomRequest } from './model/custom-request';
import { UserService } from '../services';

export const userRouteHandlers = {
    processId: (
        req: CustomRequest,
        res: Response,
        next: NextFunction,
        id: string
    ) => {
        req.id = id;
        next();
    },

    getAllUsers: (req: CustomRequest, res: Response) => {
        UserService.getAllUsers()
            .then((allUsers) => {
                allUsers
                    ? res.json(allUsers)
                    : responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    },

    getUser: (req: CustomRequest, res: Response) => {
        const { id } = req.params;

        UserService.getUserById(id)
            .then((user) => {
                user ? res.json(user) : responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    },
    deleteUser: (req: CustomRequest, res: Response) => {
        const { id } = req.params;

        UserService.deleteUser(id)
            .then((user) => {
                user ? res.json(user) : responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    },

    updateUser: (schema: ObjectSchema) => {
        return (req: CustomRequest, res: Response) => {
            const user = req.body as User;
            const { error } = schema.validate(user);

            if (!error?.isJoi) {
                UserService.updateUser(user)
                    .then((result) => {
                        res.json(`User was updated: ${JSON.stringify(result)}`);
                    })
                    .catch((err) => {
                        res.status(400).json(err.message);
                    });
            } else {
                res.status(400).json('Data is not valid');
            }
        };
    },

    createUser: (schema: ObjectSchema) => {
        return (req: CustomRequest, res: Response) => {
            const user = req.body as User;
            const { error } = schema.validate(user);

            if (!error?.isJoi) {
                const id = uuidv4();
                user.id = id;
                UserService.createUser(user)
                    .then((result) => {
                        res.json(`User was created: ${JSON.stringify(result)}`);
                    })
                    .catch((err) => {
                        res.status(400).json(err.message);
                    });
            } else {
                res.status(400).json('Data is not valid');
            }
        };
    },

    getSuggestedUsers: (req: CustomRequest, res: Response) => {
        const substr = req.query.login_substring?.toString();
        const limit = Number.parseInt(
            req.query.limit?.toString() as string,
            10
        );

        if (substr && !isNaN(limit)) {
            UserService.getAllUsers()
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
};
