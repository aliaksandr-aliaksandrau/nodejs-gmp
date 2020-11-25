import express from 'express';
import { Express } from 'express';
import { sequelize } from './database/connections';
import { createRouter } from './api/router';
import { logger } from './logger';

const app: Express = express();
const port: number = 3500;

app.listen(port, () => console.log('App is running...'));
app.use(express.json());
app.use('/', createRouter());

process
    .on('unhandledRejection', (err) => {
        logger.error(err);
    })
    .on('uncaughtException', (err) => {
        logger.error(err);
        process.exit(1);
    });

sequelize
    .authenticate()
    .then(() => {
        logger.info('Connection has been established');
    })
    .catch((err) => {
        logger.error('Unable to connect to the database:', err);
    });
