import express from 'express';
import { Express } from 'express';
import { Sequelize, DataTypes, Model, Optional, ModelCtor } from 'sequelize';
import { sequilize as sq } from './database/connections';
import { createRouter } from './server-router/router';

const app: Express = express();
const port: number = 3500;

app.listen(port, () => console.log('App is running...'));
app.use(express.json());
app.use('/', createRouter());

const sequilize: Sequelize = sq;

// const app = express();
// app.set('port', process.env.PORT || 4000);

// app.listen(4000, () => {
//     console.log('Server is running.. on Port 4000');
// });

sequilize
    .authenticate()
    .then(() => {
        console.log('Connection has been established');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// UserModel.findAll({ limit: 10 }).then((d: any) => {
//     console.log('AAA: USers: ', d);
// });

// UserModel.findByPk(1).then((d: any) => {
//     console.log('AAA: USers: ', d?.toJSON());
// });
