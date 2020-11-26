import { Router } from 'express';
import { AuthenticationController } from '../controllers';
import { authenticationSchema, validateBody } from '../data/validation';

export function authenticationRouter(): Router {
    const authenticationController = new AuthenticationController();
    return Router().post(
        '/',
        validateBody(authenticationSchema),
        authenticationController.login
    );
}
