# NodeJS Global Mentoring Programm

## Basics. Node.js fundamental theory

```sh
cd  01-basics

```

## User Group Management

### SETUP

```sh
cd  02-user-group-management

npm install

npm run start

```

### API


#### AUTHENTICATION

```sh
  POST login
```
  Request body:
```sh
{
  "username": "someusername"
  "password": "somepassword"
}
```


#### USERS

```sh

  GET users/:id

  GET users

  POST users

  PUT users/:id

  DELETE users/:id

  GET users/suggested-users?login_substring=${substring}&limit=${limit}

```

#### GROUPS

```sh

  GET groups/:id

  GET groups

  POST groups

  PUT groups/:id

  DELETE groups/:id

  POST groups/add-users - Add users to group

  GET groups/users/:id  - Get users by group id

```
