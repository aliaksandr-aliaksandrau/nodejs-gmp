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

  static async createUser(user: User): Promise<User> {
      const result = await UserModel.create(user);
      return (result as unknown) as User;
  }

  static async deleteUser(id: string): Promise<any> {
      const result = await UserModel.destroy({
          where: { id }
      });
      return (result as unknown) as User;
  }

  static async updateUser(user: User): Promise<User> {
      const id = user.id;
      const result = await UserModel.update(user, {
          where: { id },
          returning: true
      });
      return (result as unknown) as User;
  }
}
