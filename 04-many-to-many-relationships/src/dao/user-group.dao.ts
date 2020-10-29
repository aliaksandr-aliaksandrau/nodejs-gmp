import { UserGroupModel } from '../models';

export class UserGroupDao {
    static async getUserIdsByGroupId(
        id: string
    ): Promise<{ groupId: string; userIds: string[] }> {
        const group = await UserGroupModel.count({
            where: { groupId: id }
        });
        return (group as unknown) as { groupId: string; userIds: string[] };
    }
}
