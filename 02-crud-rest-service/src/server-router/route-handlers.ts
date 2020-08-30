import { Response, NextFunction } from 'express';

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

    getUser: (req: CustomRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        user ? res.json(user) : responseUserNotFoundHandler(res);
        next();
    },
    deleteUser: (req: CustomRequest, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!!user) {
            user.isDeleated = true;
            res.json(`User ${user.id} was deleted`);
        } else {
            responseUserNotFoundHandler(res);
        }

        next();
    },

    updateUser: (req: CustomRequest, res: Response, next: NextFunction) => {
        const user = req.body.user as User;

        if (user && users.has(user.id)) {
            users.set(user.id, user);
            res.json(`User ${user.id} was updated to ${JSON.stringify(user)}`);
        } else {
            responseUserNotFoundHandler(res);
        }

        next();
    },

    createUser: (req: CustomRequest, res: Response, next: NextFunction) => {
        const user = req.body.user as User;

        if (user) {
            users.set(user.id, user);
            res.json(`User was created ${JSON.stringify(user)}`);
        }

        next();
    },

    getSuggestedUsers: (req: CustomRequest, res: Response, next: NextFunction) => {
        const substr = req.query.loginSubstring?.toString();
        const limit = Number.parseInt(req.query.limit?.toString() as string, 10);

        if (substr && !isNaN(limit)) {
            const suggestedUsers = getAutoSuggestUsers([...users.values()], substr, limit);
            res.json(`Suggested users ${JSON.stringify(suggestedUsers)}`);
        } else {
            res.status(400).json('Please enter correct parameters');
        }
        next();
    }
};
