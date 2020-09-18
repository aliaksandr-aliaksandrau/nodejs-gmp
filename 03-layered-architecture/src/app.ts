import express from 'express';
import { Express } from 'express';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequilize as sq } from './database/connections';

const sequilize: Sequelize = sq;

// const { Client } = require('pg');
// const connectionString = 'postgres://glbzjpvy:bR9HhMlTqv16LOPM_iR_RiU_yQdmLg-W@balarama.db.elephantsql.com:5432/glbzjpvy';
// const client = new Client({
//     connectionString
// });
// client.connect();

const app = express();
app.set('port', process.env.PORT || 4000);
// app.get('/', (req, res, next) => {
//     client.query('SELECT * FROM users', (err: any, result: { rows: any; }) => {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err);
//         }
//         res.status(200).send(result.rows);
//         console.log('Data: ', result.rows);
//     });
// });
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

const User = sequilize.define('user', {
    id: DataTypes.INTEGER,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.NUMBER,
    isDeleated: DataTypes.BOOLEAN
});

