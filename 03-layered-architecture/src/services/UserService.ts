import { UserModel } from '../models';
import { User } from '../types';

export class UserService {
    // static async getAllUsers(): Promise<User[]> {
    //     const users = await UserModel.findAll();

    //     return users;
    // }

    static async getUserById(id: string): Promise<User> {
        const user = await UserModel.findByPk(id);
        console.log('AAA: getUserById: ', user);

        return user as unknown as User;
    }
}
