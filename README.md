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

  GET users/:id

  GET users

  POST users

  PUT users/:id

  DELETE users/:id

  GET users/suggested-users?login_substring=${substring}&limit=${limit}

```
## Homework 4 - Second entity and many-to-many relationships

#### Run app
```sh
cd  04-many-to-many-relationships

npm install

npm run start

```

#### API

  ##### GROUPS

```sh

  GET groups/:id

  GET groups

  POST groups

  PUT groups/:id

  DELETE groups/:id

  POST groups/add-users - Add users to group

  GET groups/users/:id  - Get users by group id

```
