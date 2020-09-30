import { UserModel } from '../models';
import { User } from '../types';

export class UserService {
    static async getAllUsers(): Promise<User[]> {
        const users = await UserModel.findAll();

        return (users as unknown) as User[];
    }

    static async getUserById(id: string): Promise<User> {
        const user = await UserModel.findByPk(id);
        console.log('AAA: getUserById: ', user);

        return (user as unknown) as User;
    }

    static async createUser(user: User): Promise<any> {
        const result = await UserModel.create(user);
        return (result as unknown) as User;
    }

    static async deleteUser(id: string): Promise<any> {
        const result = await UserModel.destroy({
            where: { id }
        });
        return (result as unknown) as User;
    }

    static async updateUser(user: User): Promise<any> {
        const id = user.id;
        const result = await UserModel.update(user, {
            where: { id }
        });
        return (result as unknown) as User;
    }
}
