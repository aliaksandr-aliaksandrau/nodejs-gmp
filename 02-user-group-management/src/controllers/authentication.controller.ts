import { Response, Request } from 'express';
import { controllerErrorLogger } from '../logger';
import { AuthenticationService } from '../services';

const authenticationControllerErrorLogger = (
    method: string,
    args: any[],
    error: string
) => controllerErrorLogger('AuthenticationController', method, args, error);

export class AuthenticationController {
    login(req: Request, res: Response): void {
        const { username, password } = req.body;

        AuthenticationService.login(username, password)
            .then((accessToken) => {
                if (!accessToken) {
                    res.status(401).json('Please check username and password');
                } else {
                    res.status(201).send(accessToken);
                }
            })
            .catch((err) => {
                authenticationControllerErrorLogger('login', [], err);
                res.status(400).json(err.message);
            });
    }
}
