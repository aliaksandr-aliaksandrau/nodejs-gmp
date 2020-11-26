import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import { sequelize } from './database/connections';
import { createRouter } from './api/router';
import { logger } from './logger';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: any = process.env.PORT_NUMBER || 3700;

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
};

app.listen(port, () => console.log('App is running...'));
app.use(express.json());
app.use(cors(corsOptions));
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
