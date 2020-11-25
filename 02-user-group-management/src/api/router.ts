import { Router } from 'express';

import {
    validateBody,
    userUpdateSchema,
    userCreateSchema,
    groupUpdateSchema,
    groupCreateSchema,
    getSuggestedSchema,
    validateQuery
} from '../data/validation';
import { httpInfoLogger } from '../logger';
import {
    AuthenticationController,
    GroupController,
    UserController
} from '../controllers';
import {
    authenticationCheckMiddleware,
    expressErrorLoggerMiddleware
} from '../middleware';

export function createRouter(): Router {
    const groupController = new GroupController();
    const userController = new UserController();
    const authenticationController = new AuthenticationController();

    return (
        Router()
            .use(httpInfoLogger)
            .param('id', userController.processId)
            // authentication
            .post('/login', authenticationController.login)
            // user
            .get(
                '/users/:id',
                authenticationCheckMiddleware,
                userController.getUser
            )
            .get(
                '/users',
                authenticationCheckMiddleware,
                userController.getAllUsers
            )
            .delete('/users/:id', userController.deleteUser)
            .put(
                '/users/:id',
                validateBody(userUpdateSchema),
                userController.updateUser
            )
            .post(
                '/users',
                validateBody(userCreateSchema),
                userController.createUser
            )
            .get(
                '/user/suggested-users',
                validateQuery(getSuggestedSchema),
                userController.getSuggestedUsers
            )
            // group
            .get('/groups', groupController.getAllGroups)
            .get('/groups/:id', groupController.getGroupById)
            .delete('/groups/:id', groupController.deleteGroup)
            .put(
                '/groups/:id',
                validateBody(groupUpdateSchema),
                groupController.updateGroup
            )
            .post(
                '/groups',
                validateBody(groupCreateSchema),
                groupController.createGroup
            )
            // user groups
            .post('/groups/add-users', groupController.addUsersToGroup)
            .get('/groups/users/:id', groupController.getUsersByGroupId)
            .use(expressErrorLoggerMiddleware)
    );
}
