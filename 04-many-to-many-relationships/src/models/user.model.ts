import { DataTypes, Model, ModelCtor } from 'sequelize';
import { sequilize } from '../database/connections';

export const UserModel: ModelCtor<Model> = sequilize.define(
    'users',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);
