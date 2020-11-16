import { Router } from 'express';

import { userSchema, groupSchema } from '../data/validation';
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
            .put('/users', userService.updateUser(userSchema) as any)
            .post('/users', userService.createUser(userSchema) as any)
            .use('/users/suggested-users', userService.getSuggestedUsers)
            // group
            .get('/groups', groupService.getAllGroups)
            .get('/groups/:id', groupService.getGroupById)
            .delete('/groups/:id', groupService.deleteGroup)
            .put('/groups', groupService.updateGroup(groupSchema) as any)
            .post('/groups', groupService.createGroup(groupSchema) as any)
            // user groups
            .post('/groups/add-users', groupService.addUsersToGroup)
            .get('/groups/users/:id', groupService.getUsersByGroupId)
    );
}
