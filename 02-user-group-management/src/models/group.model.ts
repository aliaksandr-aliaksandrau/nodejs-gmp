import { BelongsToManyOptions, DataTypes, Model, ModelCtor } from 'sequelize';
import { sequelize } from '../database/connections';
import { UserModel } from './user.model';

export const GroupModel: ModelCtor<Model> = sequelize.define(
    'group',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

GroupModel.belongsToMany(UserModel, {
    through: 'user_group',
    as: 'users',
    targetKey: 'id',
    foreignKey: 'group_id',
    timestamps: false
} as BelongsToManyOptions);

UserModel.belongsToMany(GroupModel, {
    through: 'user_group',
    as: 'groups',
    targetKey: 'id',
    foreignKey: 'user_id',
    timestamps: false
});
