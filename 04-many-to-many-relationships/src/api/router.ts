import { Router } from 'express';

import { userRouteHandler } from './user-route-handler';
import { userSchema } from '../data/validation/user-schema';
import { groupService } from '../services/group-service';

export function createRouter(): Router {
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
    );
}
