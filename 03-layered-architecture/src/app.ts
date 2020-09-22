import express from 'express';
import { Express } from 'express';
import { Sequelize, DataTypes, Model, Optional, ModelCtor } from 'sequelize';
import { sequilize as sq } from './database/connections';

const sequilize: Sequelize = sq;

const app = express();
app.set('port', process.env.PORT || 4000);

app.listen(4000, () => {
    console.log('Server is running.. on Port 4000');
});

sequilize
    .authenticate()
    .then(() => {
        console.log('Connection has been established');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

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

// UserModel.findAll({ limit: 10 }).then((d) => {
//     console.log('AAA: USers: ', d);
// });

UserModel.findByPk(1).then((d) => {
    console.log('AAA: USers: ', d?.toJSON());
});
