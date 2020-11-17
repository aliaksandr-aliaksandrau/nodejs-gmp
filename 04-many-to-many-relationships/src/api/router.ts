import { Router } from 'express';

import { userSchema, groupSchema, validate } from '../data/validation';
import { GroupService } from '../services/group-service';
import { UserService } from '../services';

export function createRouter(): Router {
    const groupService = new GroupService();
    const userService = new UserService();

    return (
        Router()
            .param('id', userService.processId)
            // user
            .get('/users/:id', userService.getUser)
            .get('/users', userService.getAllUsers)
            .delete('/users/:id', userService.deleteUser)
            .put('/users/:id', validate(userSchema), userService.updateUser)
            .post('/users', validate(userSchema), userService.createUser)
            .use('/users/suggested-users', userService.getSuggestedUsers)
            // group
            .get('/groups', groupService.getAllGroups)
            .get('/groups/:id', groupService.getGroupById)
            .delete('/groups/:id', groupService.deleteGroup)
            .put('/groups/:id', validate(groupSchema), groupService.updateGroup)
            .post('/groups', validate(groupSchema), groupService.createGroup)
            // user groups
            .post('/groups/add-users', groupService.addUsersToGroup)
            .get('/groups/users/:id', groupService.getUsersByGroupId)
    );
}
