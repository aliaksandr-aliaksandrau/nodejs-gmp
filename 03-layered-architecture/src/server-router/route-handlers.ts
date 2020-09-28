import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { v4 as uuidv4 } from 'uuid';

import mockUsers from './../mock-users.json';
import { responseUserNotFoundHandler, getAutoSuggestUsers } from '../utility';
import { User } from '../types/user';
import { CustomRequest } from '../model/custom-request';
import { UserService } from '../services';
import { nextTick } from 'process';

const users: Map<string, User> = new Map();
// mockUsers.forEach((user: User) => users.set(user.id, user));

export const userRouteHandlers = {
    processId: (
        req: CustomRequest,
        res: Response,
        next: NextFunction,
        id: string
    ) => {
        req.id = id;
        req.user = users.get(id);
        next();
    },

    getAllUsers: (req: CustomRequest, res: Response) => {
        UserService.getAllUsers()
            .then((allUsers) => {
                // console.log('AAA: userRouteHandlers: getAllUsers: ', allUsers);
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

        UserService.getUserById(+id)
            .then((user) => {
                //  console.log('AAA: userRouteHandlers: getUser: ', user);
                user ? res.json(user) : responseUserNotFoundHandler(res);
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
    },
    deleteUser: (req: CustomRequest, res: Response) => {
        //  const user = req.user;

        const { id } = req.params;

        UserService.deleteUser(+id)
            .then((user) => {
                //  console.log('AAA: userRouteHandlers: getUser: ', user);
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
                if (users.has(user.id)) {
                    users.set(user.id, user);
                    res.json(
                        `User ${user.id} was updated to ${JSON.stringify(user)}`
                    );
                } else {
                    responseUserNotFoundHandler(res);
                }
            } else {
                res.status(400).json(error.message);
            }
        };
    },

    createUser: (schema: ObjectSchema) => {
        return (req: CustomRequest, res: Response) => {
            const user = req.body as User;
            const { error } = schema.validate(user);

            if (!error?.isJoi) {
                // const id = uuidv4();
                //  user.id = id;
                user.deleated = false;
                //   users.set(id, user);
                console.log('AAA: create user: ', user);
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
            const suggestedUsers = getAutoSuggestUsers(
                [...users.values()],
                substr,
                limit
            );
            res.json(`Suggested users ${JSON.stringify(suggestedUsers)}`);
        } else {
            res.status(400).json('Please enter correct parameters');
        }
    }
};
