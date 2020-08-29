
import * as express from 'express';

import { User } from './model/user';
import { NextFunction, Router, Express } from 'express';

const app: Express = express();
const port: number = 3500;
const router: Router = Router();

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

app.use(express.json());

router.param('id', (req: any, res, next, id) => {
  req.user = users.find(el => el.id === id);
  console.log('PARAMS: users: ', req.user);
  next();
})

router.get('/users/:id', (req: any, res, next: NextFunction) => {
  const user = req.user;
  console.log('GET: users: ', users.length);
  res.json(user);
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


router.put('/users/:id', (req, res, next) => {
  const user = req.body.user as User;


  res.json(`User ${user.id} was updated ${JSON.stringify(user)}`);
  next();
});

router.post('/users', (req, res, next) => {
  const user = req.body.user as User;
  res.json(`User was created ${JSON.stringify(user)}`);
  users.push(user);
  console.log(users.length);
  next();
});

app.use('/', router);

