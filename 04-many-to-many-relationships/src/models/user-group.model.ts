// import { Model, ModelCtor } from 'sequelize/types';
// import { sequelize } from '../database/connections';
// import { GroupModel } from './group.model';
// import { UserModel } from './user.model';

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

// export const UserGroupModel: ModelCtor<Model> = sequilize.define(
//     'user_group',
//     {},
//     {
//         timestamps: false
//     }
// );
