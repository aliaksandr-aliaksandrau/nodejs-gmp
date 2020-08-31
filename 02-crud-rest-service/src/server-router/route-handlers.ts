import { Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { v4 as uuidv4 } from 'uuid';

import mockUsers from './../mock-users.json';
import { responseUserNotFoundHandler, getAutoSuggestUsers } from '../utility';
import { User } from '../model/user';
import { CustomRequest } from '../model/custom-request';

const users: Map<string, User> = new Map();
mockUsers.forEach((user: User) => users.set(user.id, user));

export const userRouteHandlers = {
    processId: (req: CustomRequest, res: Response, next: NextFunction, id: string) => {
        req.user = users.get(id);
        next();
    },

    getUser: (req: CustomRequest, res: Response) => {
        const user = req.user;
        user ? res.json(user) : responseUserNotFoundHandler(res);
    },
    deleteUser: (req: CustomRequest, res: Response) => {
        const user = req.user;

        if (!!user) {
            user.isDeleated = true;
            res.json(`User ${user.id} was deleted`);
        } else {
            responseUserNotFoundHandler(res);
        }
    },

    updateUser: (schema: ObjectSchema) => {
        return (req: CustomRequest, res: Response) => {
            const user = req.body as User;
            const { error } = schema.validate(user);

            if (!error?.isJoi) {
                if (users.has(user.id)) {
                    users.set(user.id, user);
                    res.json(`User ${user.id} was updated to ${JSON.stringify(user)}`);
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
                const id = uuidv4();
                user.id = id;
                user.isDeleated = false;
                users.set(id, user);
                res.json(`User was created: ${JSON.stringify(user)}`);
            } else {
                res.status(400).json(error.message);
            }
        };
    },

    getSuggestedUsers: (req: CustomRequest, res: Response) => {
        const substr = req.query.login_substring?.toString();
        const limit = Number.parseInt(req.query.limit?.toString() as string, 10);

        if (substr && !isNaN(limit)) {
            const suggestedUsers = getAutoSuggestUsers([...users.values()], substr, limit);
            res.json(`Suggested users ${JSON.stringify(suggestedUsers)}`);
        } else {
            res.status(400).json('Please enter correct parameters');
        }
    }
};
