import { User } from "./model/user";

export function responseUserNotFoundHandler(res: any): void {
    res.status(404).json(`User was not found`);
}

export function getAutoSuggestUsers(users: User[], loginSubstring: string, limit: number): User[] {
    //TODO add sorting 

    const filteredUsers = users
        .filter(user => user.login.includes(loginSubstring))
        .slice(0, limit);

    return filteredUsers;
}
