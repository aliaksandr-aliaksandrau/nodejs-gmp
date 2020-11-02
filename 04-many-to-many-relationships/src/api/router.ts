import { Router } from 'express';

import { userRouteHandler } from './user-route-handler';
import { userSchema, groupSchema } from '../data/validation';
import { GroupService } from '../services/group-service';

export function createRouter(): Router {
    const groupService = new GroupService();

    return (
        Router()
            .param('id', userRouteHandler.processId)
            // user
            .get('/user/:id', userRouteHandler.getUser)
            .get('/users', userRouteHandler.getAllUsers)
            .delete('/user/:id', userRouteHandler.deleteUser)
            .put('/user', userRouteHandler.updateUser(userSchema))
            .post('/user', userRouteHandler.createUser(userSchema))
            .use('/suggested-users', userRouteHandler.getSuggestedUsers)
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
