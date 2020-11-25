import { v4 as uuidv4 } from 'uuid';

import { GroupDao } from '../dao';
import { Group } from '../types';

export class GroupService {
    static async getAllGroups(): Promise<Group[]> {
        return GroupDao.getAllGroups();
    }

    static async getGroupById(id: string): Promise<Group> {
        return GroupDao.getGroupById(id);
    }

    static async deleteGroup(id: string): Promise<number> {
        return GroupDao.deleteGroup(id);
    }

    static async updateGroup(id: string, group: Group): Promise<Group> {
        return GroupDao.updateGroup(id, group);
    }

    static async createGroup(group: Group): Promise<Group> {
        const id = uuidv4();
        group.id = id;
        return GroupDao.createGroup(group);
    }

    static async addUsersToGroup(
        groupId: string,
        userIds: string[]
    ): Promise<any> {
        return GroupDao.addUsersToGroup(groupId, userIds);
    }

    static async getUsersByGroupId(groupsId: string): Promise<any> {
        return GroupDao.getUsersByGroupId(groupsId);
    }
}
