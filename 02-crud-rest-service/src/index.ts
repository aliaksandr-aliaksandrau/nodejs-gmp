
import * as express from 'express';

//const express:  = require('express');
const app: express.Express = express();
const port: number = 3500;

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


router.param('id', (req, res, next, id) => {
  req['user'] = users.find(el => el.id === id);
  next();
})


router.get('/users/:id', (req, res, next: express.NextFunction) => {

  // const id = req.params.id;

  // const user = users.find(el => el.id === id);


  const user = req['user'];

  res.json(user);

  // res.send('Hello World!')

  next();
});

router.delete('/users/:id', (req, res, next) => {

  const id = req.params.id;

  const user = users.find(el => el.id === id);

  if (!!user) {
    user.isDeleated = true;

    res.json(`User ${id} was deleted`);
  } else {
    res.status(404).json(`User ${id} was not found`);
  }

  next();
});

router.post('/users', (req, res, next) => {
  const user = `user_`;
  res.json(user);

  // res.send('USERS REQ')

  next();
});

// router.use((req, res, next) => {
//   console.log('REQUEST: ', req);
//   next();
// });



app.use('/', router);

