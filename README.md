# NodeJS Global Mentoring Programm


## Homework 1 - Basics. Node.js fundamental theory

```sh
cd  01-basics

```

## Homework 2 - In-memory CRUD REST service with validation

```sh
cd  02-crud-rest-service

```

## Homework 3 - PostgreSQL and layered architecture

#### Run app
```sh
cd  03-layered-architecture

npm install

npm run start

```
#### API

  ##### USERS

```sh

  GET user/:id

  GET users

  POST user

  PUT user

  DELETE user/:id

  GET suggested-users?login_substring=${substring}&limit=${limit}

```

  ##### GROUPS

```sh

  GET groups/:id

  GET groups

  POST groups

  PUT groups

  DELETE groups/:id

  POST groups/add-users - Add users to group

  GET groups/users/:id  - Get users by group id

```


