import jwt from 'jsonwebtoken';

import { User } from '../types';

const secret: string = 'secret';

export class AuthenticationService {
    static async login(
        username: string,
        password: string
    ): Promise<string | null> {
        const mockUsername = 'test';
        const mockPassword = 'test';

        if (username === mockUsername && password === mockPassword) {
            const user: Partial<User> = {
                id: '1',
                login: 'test',
                age: 20
            };

            const token = jwt.sign(user, secret, {
                expiresIn: '1m'
            });
            return token;
        }
        return null;
    }

    static checkToken(token: string): boolean {
        return true;
    }
}
