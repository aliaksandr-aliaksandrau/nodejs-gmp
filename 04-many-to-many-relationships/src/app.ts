import express from 'express';
import { Express } from 'express';
import { sequelize } from './database/connections';
import { createRouter } from './api/router';

const app: Express = express();
const port: number = 3500;

app.listen(port, () => console.log('App is running...'));
app.use(express.json());
app.use('/', createRouter());

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
