import { User } from './types/user';

export function responseUserNotFoundHandler(res: any): void {
    res.status(404).json('User was not found');
}

export function responseGroupNotFoundHandler(res: any): void {
    res.status(404).json('Group was not found');
}

export function getAutoSuggestUsers(
    users: User[],
    loginSubstring: string = '',
    limit: number
): User[] {
    const filteredUsers = users
        .filter((user) => user.login.includes(loginSubstring))
        .sort(sortByLogin)
        .slice(0, limit);
    return filteredUsers;
}

function sortByLogin(u1: User, u2: User): number {
    const a = u1.login;
    const b = u2.login;

    if (a > b) {
        return 1;
    }
    if (b > a) {
        return -1;
    }
    return 0;
}
