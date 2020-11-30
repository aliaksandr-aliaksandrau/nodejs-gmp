import { logger } from '../logger';
import { UserModel } from '../models';
import { User } from '../types';

export class UserDao {
    static async getAllUsers(): Promise<User[]> {
        const users = await UserModel.findAll();
        return (users as unknown) as User[];
    }

    static async getUserById(id: string): Promise<User> {
        const user = await UserModel.findByPk(id);
        return (user as unknown) as User;
    }

    static async getUserByNameAndPassword(
        name: string,
        password: string
    ): Promise<User> {
        const user = await UserModel.findOne({
            where: { login: name, password }
        });
        return (user as unknown) as User;
    }

    static async createUser(user: User): Promise<User> {
        const result = await UserModel.create(user);
        return (result as unknown) as User;
    }

    static async deleteUser(id: string): Promise<number> {
        const result = await UserModel.destroy({
            where: { id }
        });
        return result;
    }

    static async updateUser(id: string, user: User): Promise<User> {
        const result = await UserModel.update(user, {
            where: { id },
            returning: true
        });
        return (result as unknown) as User;
    }
}
