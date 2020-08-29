import express from 'express';

import { User } from './model/user';
import { NextFunction, Router, Express } from 'express';

import mockUsers from './mock-users.json';

const app: Express = express();
const port: number = 3500;
const router: Router = Router();


const users: Map<string, User> = new Map();
mockUsers.forEach((user: User) => users.set(user.id, user));


app.listen(port, () => {
  console.log(`App is running...`)
});

app.use(express.json());

router.param('id', (req: any, res, next: NextFunction, id) => {
   
  req.user = users.get(id);
  
  next();
})

router.get('/users/:id', (req: any, res, next: NextFunction) => {
  const user = req.user;
  user ? res.json(user) : userNotFoundHandler(res);
  next();
});

router.delete('/users/:id', (req: any, res, next: NextFunction) => {
  const user = req.user;

  if (!!user) {
    user.isDeleated = true;
    res.json(`User ${user.id} was deleted`);
  } else {
    userNotFoundHandler(res);
  }

  next();
});


router.put('/users', (req, res, next: NextFunction) => {
  
  const user = req.body.user as User;

  if (user && users.has(user.id)) {
    users.set(user.id, user)
    res.json(`User ${user.id} was updated to ${JSON.stringify(user)}`);
  } else {
    userNotFoundHandler(res);
  }

  next();
});

router.post('/users', (req, res, next) => {
  const user = req.body.user as User;

  if(user) {
    users.set(user.id, user);
    res.json(`User was created ${JSON.stringify(user)}`);
  }

  next();
});

app.use('/', router);


function userNotFoundHandler(res: any): void {
  res.status(404).json(`User was not found`);
}

