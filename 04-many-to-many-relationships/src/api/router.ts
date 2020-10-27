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
            .get('/group/:id', groupService.getGroupById)
            .delete('/group/:id', groupService.deleteGroup)
            .put('/group', groupService.updateGroup(groupSchema) as any)
            .post('/group', groupService.createGroup(groupSchema) as any)
    );
}
