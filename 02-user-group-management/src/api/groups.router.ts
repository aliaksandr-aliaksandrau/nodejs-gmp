import { Router } from 'express';
import { GroupController } from '../controllers';
import {
    groupCreateSchema,
    groupUpdateSchema,
    validateBody
} from '../data/validation';
import { authenticationCheckMiddleware } from '../middleware';

export function groupsRouter(): Router {
    const groupController = new GroupController();
    return Router()
        .use(authenticationCheckMiddleware)
        .get('/', groupController.getAllGroups)
        .get('/:id', groupController.getGroupById)
        .delete('/:id', groupController.deleteGroup)
        .put(
            '/:id',
            validateBody(groupUpdateSchema),
            groupController.updateGroup
        )
        .post('/', validateBody(groupCreateSchema), groupController.createGroup)
        .post('/add-users', groupController.addUsersToGroup)
        .get('/users/:id', groupController.getUsersByGroupId);
}
