import { GroupModel } from '../models';
import { Group } from '../types';

export class GroupDao {
    static async getAllGroups(): Promise<Group[]> {
        const groups = await GroupModel.findAll();
        return (groups as unknown) as Group[];
    }

    static async getGroupById(id: string): Promise<Group> {
        const group = await GroupModel.findByPk(id);
        return (group as unknown) as Group;
    }

    static async createGroup(group: Group): Promise<Group> {
        const result = await GroupModel.create(group);
        return (result as unknown) as Group;
    }

    static async deleteGroup(id: string): Promise<any> {
        const result = await GroupModel.destroy({
            where: { id }
        });
        return (result as unknown) as Group;
    }

    static async updateGroup(group: Group): Promise<Group> {
        const id = group.id;
        const result = await GroupModel.update(group, {
            where: { id },
            returning: true
        });
        return (result as unknown) as Group;
    }
}
