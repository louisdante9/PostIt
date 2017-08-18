# PostIt

 [![Code Climate](https://codeclimate.com/github/louisdante9/PostIt/badges/gpa.svg)](https://codeclimate.com/github/louisdante9/PostIt) [![Coverage Status](https://coveralls.io/repos/github/louisdante9/PostIt/badge.svg)](https://coveralls.io/github/louisdante9/PostIt) [![Build Status](https://travis-ci.org/louisdante9/PostIt.svg?branch=master)](https://travis-ci.org/louisdante9/PostIt)
## Introduction
**`PostIt`** is a simple application that allows friends and colleagues create groups for notifications. It allows a person post notifications to everyone in his group by sending a message once.
  It has the following features;
  *  Creating of an account
  *  Signing in a registerd user
  *  Create Groups and be added to groups by other users
  *  Add users to the group
  *  Post messages in member groups
  *  Edit and update group details
  *  Delete a group

## Dependencies

### Back End Dependencies
This app's functionality depends on multiple NPM packages including;
  *  **[Express](https://www.npmjs.com/package/express)** - This framework enables robust routing and building web Applications and API's with focus on high performance
  *  **[Sequelize](https://www.npmjs.com/package/sequelize)** - A a promise-based ORM for Node.js and io.js. Used in this project as ORM for postgres
  *  **[Sequelize-cli](https://github.com/sequelize/cli)** - The Sequelize Command Line Interface (CLI)
  *  **[Postgres](https://www.postgresql.org/)** - A a promise-based ORM for Node.js and io.js. Used in this project as ORM for postgres
  *  **[Body-Parser](https://www.npmjs.com/package/body-parser)** - This package parse incoming request bodies in a middleware and makes it available under *req.body* property
  *  **[JsonWebToken](https://jwt.io/)** - The module is a middleware for authenticating node.js applications
  *  **[dotenv](https://github.com/kennethreitz/autoenv)** - Enables loading environment variables from a .env file into process.env.

## Installation and Setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
  *  Using SSH;

    > git clone git@github.com:louisdante9/PostIt.git

  *  Using HTTPS;

    > git clone https://github.com/louisdante9/PostIt.git

*  Navigate to the repo's folder on your computer
  *  `cd PostIt/`
* Install the app's backend dependencies using `npm install`

  #### Note
  * In order to begin using, you need to have __nodeJs__ and **npm** installed on your system.
  * For database you need to install __PostGres__ locally or setup with an online client eg. **ElephantSql**
  * Create two (2) databases one for __development__ and the other for **testing**
  * Change database config variables in the config.json file, based on your own db set-up
  * In other to interact effectively with endpoints, install and use __Postman__

* Run the app
  *  `npm start`
  *  Running the command above will run the app at localhost://3002.

## Endpoints Summary

name   |     url       |      verb      |     description
------ | ------------- | -------------- | -------------------
**AUTH**    |               |                 |
REGISTER     |  /api/user/signup     |     POST     |     Allows users to register an account on PostIt
LOGIN     |    /api/user/signin   |    POST      |    Allows a registered user to login
**GROUP** |
GET ALL     |    /api/groups   |    GET      |    Allows a registered user to retrieve all groups he belongs to
CREATE     |  /api/group     |     POST     |     Allows a registered user to create a new group
**ADD USERS TO A GROUP**|
CREATE     |    /api/group/:id/user   |    POST      |    Adds one member to a group
**MESSAGES** |
GET     |    /api/group/:id/messages   |    GET      |    Retrieves one member-group and all it's messages
CREATE     |  /api/group/:id/message     |     POST     |     Allows group members to post messages in memeber groups

## Payload Examples for POST and PUT Requests

#### Register New User: `/api/user/register`
To register a new user, send the following parameters `(example below)`:
```
{
  "username": "louis",
  "password": "louis1223",
  "email": "louisdante9@gmail.com"
  "phone": "234000000000"
}
```

#### Create New Group: `/api/group`
To create a new group, send the following parameters `(Name cannot be empty. Example below)`:
```
{
  "name": "Collaborate more",
  "description": "Learn how to collaborate more"
}
```
N:B: You can only edit details of groups you created

#### Add New Users to a Group: `/api/group/:id/user`
To add new users to a group, send the following parameter `(Example below)`:
```
{
  "idToAdd": 1
}
```
N:B: You can only add users to a group you create

#### Post messages in Groups you belong: `/api/group/:groupid/message`
To post messages in group, you need to send the following parameters `(Example below)`:
```
{
  "message": "I enjoyed every bit of learning today"
}
```
N:B: You can only post message in groups you have created or have been added to

## Tests
*  The tests have been written using **[Mocha](https://www.npmjs.com/package/mocha)** , **[Chai](https://www.npmjs.com/package/chai)** as it's assertion library and **[Supertest](https://www.npmjs.com/package/supertest)** class.
*  To run the tests, navigate to the project's folder and open
*  Issue the following command on terminal.
  *  `npm run test`
*  If the tests are successful, they will complete without failures or errors.

###### Louis Nwamadi

