// import { DataTypes, Model, ModelCtor } from 'sequelize/types';
import { Sequelize, DataTypes, Model, Optional, ModelCtor } from 'sequelize';
import { sequilize } from '../database/connections';

export const UserModel: ModelCtor<Model> = sequilize.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        username: {
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
        },
        deleated: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);
