import { Router } from 'express';

import { httpInfoLogger } from '../logger';
import { expressErrorLoggerMiddleware } from '../middleware';
import { usersRouter } from './users.router';
import { groupsRouter } from './groups.router';
import { authenticationRouter } from './authentication.router';

export function createRouter(): Router {
    return Router()
        .use(httpInfoLogger)
        .use('/login', authenticationRouter())
        .use('/users', usersRouter())
        .use('/groups', groupsRouter())
        .use(expressErrorLoggerMiddleware);
}
