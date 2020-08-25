
import * as express from 'express';

//const express:  = require('express');
const app: express.Express = express();
const port: number = 3000;

const router: express.Router = express.Router();


type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleated: boolean;
}

const users: User[] = [
  {
    id: '1',
    login: 'user1',
    password: 'pass_1',
    age: 20,
    isDeleated: false
  },
  {
    id: '2',
    login: 'user2',
    password: 'pass_2',
    age: 22,
    isDeleated: false
  }
];

app.listen(port, () => {
  console.log(`App is running...`)
});


router.get('/user/:id', (req, res, next) => {

  const id = req.params.id;

  const user = users.find(el => el.id === id);

  res.json(user);

  // res.send('Hello World!')

  next();
});

router.put('/user', (req, res, next) => {
  const user = `user_`;
  res.json(user);

  res.send('USERS REQ')

  next();
});



app.use('/', router);

