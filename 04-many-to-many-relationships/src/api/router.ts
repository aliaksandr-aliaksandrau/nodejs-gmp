import { Router } from 'express';

import {
    validate,
    userUpdateSchema,
    userCreateSchema,
    groupUpdateSchema,
    groupCreateSchema
} from '../data/validation';
import { GroupService } from '../services/group-service';
import { UserService } from '../services';
import { httpInfoLogger } from '../logger';

export function createRouter(): Router {
    const groupService = new GroupService();
    const userService = new UserService();

    return (
        Router()
            .use(httpInfoLogger)
            .param('id', userService.processId)
            // user
            .get('/users/:id', userService.getUser)
            .get('/users', userService.getAllUsers)
            .delete('/users/:id', userService.deleteUser)
            .put(
                '/users/:id',
                validate(userUpdateSchema),
                userService.updateUser
            )
            .post('/users', validate(userCreateSchema), userService.createUser)
            .use('/users/suggested-users', userService.getSuggestedUsers)
            // group
            .get('/groups', groupService.getAllGroups)
            .get('/groups/:id', groupService.getGroupById)
            .delete('/groups/:id', groupService.deleteGroup)
            .put(
                '/groups/:id',
                validate(groupUpdateSchema),
                groupService.updateGroup
            )
            .post(
                '/groups',
                validate(groupCreateSchema),
                groupService.createGroup
            )
            // user groups
            .post('/groups/add-users', groupService.addUsersToGroup)
            .get('/groups/users/:id', groupService.getUsersByGroupId)
    );
}
