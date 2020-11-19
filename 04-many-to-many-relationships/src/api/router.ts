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
import { GroupController, UserController } from '../controllers';
import { expressErrorLoggerMiddleware } from '../middleware';

export function createRouter(): Router {
    const groupController = new GroupController();
    const userController = new UserController();

    return (
        Router()
            .use(httpInfoLogger)
            .param('id', userController.processId)
            // user
            .get('/users/:id', userController.getUser)
            .get('/users', userController.getAllUsers)
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
