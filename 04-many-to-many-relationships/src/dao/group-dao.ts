import { sequelize } from '../database/connections';
import { GroupModel, UserModel } from '../models';
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

    static async deleteGroup(id: string): Promise<number> {
        const result = await GroupModel.destroy({
            where: { id }
        });
        return result;
    }

    static async updateGroup(id: string, group: Group): Promise<any> {
        const result = await GroupModel.update(group, {
            where: { id },
            returning: true
        });
        return (result as unknown) as Group;
    }

    static async addUsersToGroup(
        groupId: string,
        userIds: string[]
    ): Promise<any> {
        const t = await sequelize.transaction();

        try {
            const groups: any = await GroupModel.findByPk(groupId);
            if (!groups) {
                return null;
            }

            const users: any = await UserModel.findAll({
                where: { id: userIds }
            });

            if (!users || (users && users.length === 0)) {
                return null;
            }

            await groups.addUsers(users, {
                transaction: t
            });
            return await t.commit();
        } catch (error) {
            console.error(error);
            await t.rollback();
            return null;
        }
    }

    static async getUsersByGroupId(groupsId: string): Promise<any> {
        const result: any = await GroupModel.findAll({
            where: { id: groupsId },
            include: [
                {
                    model: UserModel,
                    as: 'users',
                    attributes: ['id', 'login', 'age']
                }
            ]
        });
        return result;
    }
}
