import { Router } from 'express';

import { userRouteHandlers } from './route-handlers';
import { userSchema } from '../data/validation/user-schema';

export function createRouter(): Router {
    return Router()
        .param('id', userRouteHandlers.processId)
        .get('/user/:id', userRouteHandlers.getUser)
        .delete('/user/:id', userRouteHandlers.deleteUser)
        .put('/user', userRouteHandlers.updateUser(userSchema))
        .post('/user', userRouteHandlers.createUser)
        .use('/suggested-users', userRouteHandlers.getSuggestedUsers);
}
