import express from 'express';
import { Express } from 'express';

import { createRouter } from './server-router/router';

const app: Express = express();
const port: number = 3500;

app.listen(port, () => console.log('App is running...'));
app.use(express.json());
app.use('/', createRouter());
