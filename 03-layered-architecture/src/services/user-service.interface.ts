import { User } from '../types';

export interface IUserService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createUser(user: User): Promise<any>;
    deleteUser(id: string): Promise<any>;
    updateUser(user: User): Promise<any>;
}
