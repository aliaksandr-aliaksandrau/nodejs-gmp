import { v4 as uuidv4 } from 'uuid';

import { UserDao } from '../dao';
import { User } from '../types';

export class UserService {
    static async getAllUsers(): Promise<User[]> {
        return UserDao.getAllUsers();
    }

    static async getUserById(id: string): Promise<User> {
        return UserDao.getUserById(id);
    }

    static async getUserByNameAndPassword(name: string, password: string) {
        return UserDao.getUserByNameAndPassword(name, password);
    }

    static async deleteUser(id: string): Promise<number> {
        return UserDao.deleteUser(id);
    }

    static async updateUser(id: string, user: User): Promise<User> {
        return UserDao.updateUser(id, user);
    }

    static async createUser(user: User): Promise<User> {
        const id = uuidv4();
        user.id = id;

        return UserDao.createUser(user);
    }

    static async getSuggestedUsers(): Promise<User[]> {
        return UserDao.getAllUsers();
    }
}
