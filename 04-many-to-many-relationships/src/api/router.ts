import { Router } from 'express';

import {
    validate,
    userUpdateSchema,
    userCreateSchema,
    groupUpdateSchema,
    groupCreateSchema
} from '../data/validation';
import { httpInfoLogger } from '../logger';
import { GroupController, UserController } from '../controllers';

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
                validate(userUpdateSchema),
                userController.updateUser
            )
            .post(
                '/users',
                validate(userCreateSchema),
                userController.createUser
            )
            .use('/users/suggested-users', userController.getSuggestedUsers)
            // group
            .get('/groups', groupController.getAllGroups)
            .get('/groups/:id', groupController.getGroupById)
            .delete('/groups/:id', groupController.deleteGroup)
            .put(
                '/groups/:id',
                validate(groupUpdateSchema),
                groupController.updateGroup
            )
            .post(
                '/groups',
                validate(groupCreateSchema),
                groupController.createGroup
            )
            // user groups
            .post('/groups/add-users', groupController.addUsersToGroup)
            .get('/groups/users/:id', groupController.getUsersByGroupId)
    );
}
