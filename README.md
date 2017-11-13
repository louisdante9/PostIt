# PostIt

 [![Code Climate](https://codeclimate.com/github/louisdante9/PostIt/badges/gpa.svg)](https://codeclimate.com/github/louisdante9/PostIt) [![Coverage Status](https://coveralls.io/repos/github/louisdante9/PostIt/badge.svg)](https://coveralls.io/github/louisdante9/PostIt) [![Build Status](https://travis-ci.org/louisdante9/PostIt.svg?branch=master)](https://travis-ci.org/louisdante9/PostIt)
 [![Deploy](https://collab-postit.herokuapp.com/)
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

## Dependencies
* See Package.json for reference 


## Tests
*  The tests have been written using **[Mocha](https://www.npmjs.com/package/mocha)** , **[Chai](https://www.npmjs.com/package/chai)** as it's assertion library and **[Supertest](https://www.npmjs.com/package/supertest)** class.
*  To run the tests, navigate to the project's folder and open
*  Issue the following command on terminal.
  *  `npm run test`
*  If the tests are successful, they will complete without failures or errors.

###### Louis Nwamadi

