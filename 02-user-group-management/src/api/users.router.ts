import { Router } from 'express';

import { UserController } from '../controllers';
import {
    getSuggestedSchema,
    userCreateSchema,
    userUpdateSchema,
    validateBody,
    validateQuery
} from '../data/validation';
import { authenticationCheckMiddleware } from '../middleware';

export function usersRouter(): any {
    const userController = new UserController();
    return Router()
        .use(authenticationCheckMiddleware)
        .get('/:id', userController.getUser)
        .get('/', userController.getAllUsers)
        .delete('/:id', userController.deleteUser)
        .put('/:id', validateBody(userUpdateSchema), userController.updateUser)
        .post('/', validateBody(userCreateSchema), userController.createUser)
        .get(
            '/suggested-users',
            validateQuery(getSuggestedSchema),
            userController.getSuggestedUsers
        );
}
