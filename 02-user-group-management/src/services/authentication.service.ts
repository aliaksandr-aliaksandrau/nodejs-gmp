import jwt from 'jsonwebtoken';
import { UserDao } from '../dao';

const secret: string = process.env.PORT_NUMBER as string;

export class AuthenticationService {
    static async login(name: string, password: string) {
        const user = await UserDao.getUserByNameAndPassword(name, password);
        if (user) {
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.login,
                    age: user.age
                },
                secret,
                {
                    expiresIn: '10m'
                }
            );
            return { token };
        }
        return null;
    }
}
