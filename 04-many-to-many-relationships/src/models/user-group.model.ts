import { Model, ModelCtor } from 'sequelize/types';
import { sequelize } from '../database/connections';
import { GroupModel } from './group.model';
import { UserModel } from './user.model';

// GroupModel.belongsToMany(UserModel, {
//     through: 'user_group',
//     // as: 'tags',
//     foreignKey: 'group_id'
// });

// UserModel.belongsToMany(GroupModel, {
//     through: 'user_group',
//     // as: 'tags',
//     foreignKey: 'user_id'
// });

GroupModel.belongsToMany(UserModel, {
    through: 'user_group',
    as: 'users',
    targetKey: 'id',
    foreignKey: 'group_id',
    timestamps: false
});

UserModel.belongsToMany(GroupModel, {
    through: 'user_group',
    as: 'groups',
    targetKey: 'id',
    foreignKey: 'user_id',
    timestamps: false
});

export const UserGroupModel: ModelCtor<Model> = sequelize.define(
    'user_group',
    {},
    {
        timestamps: false
    }
);
