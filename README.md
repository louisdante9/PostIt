# PostIt

 [![Code Climate](https://codeclimate.com/github/louisdante9/PostIt/badges/gpa.svg)](https://codeclimate.com/github/louisdante9/PostIt) [![Coverage Status](https://coveralls.io/repos/github/louisdante9/PostIt/badge.svg)](https://coveralls.io/github/louisdante9/PostIt) [![Build Status](https://travis-ci.org/louisdante9/PostIt.svg?branch=master)](https://travis-ci.org/louisdante9/PostIt)
 [Heroku hosted](https://collab-postit.herokuapp.com/)
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
## Technologies
 * [ECMAScript 6](http://es6-features.org/): This is the newest version of JavsScript with new features such as arrow functions, spread and rest operators and many more.
 * [REACT](https://facebook.github.io/react/): REACT is a JavaScript framework developed by Facebook and it is used for developing web application. REACT is the 'VIEW' in the MVC architecture.
 * [FLUX](http://facebook.github.io/flux/): Flux is an architecture used for building stable and efficient web applications. Flux design is a unidirectional flow of data.
 * [Babel:](https://babeljs.io/)  Babel is used to transpile es6 down to es5.
 * [Webpack:](https://webpack.github.io/docs/what-is-webpack.html)  Webpack is used to bundle modules with dependencies and run mundane tasks.
 * [Axios:](https://www.npmjs.com/package/axios)  Axios is an http client library used in making API calls.
 * [Jest:](https://facebook.github.io/jest/) Jest is used to run tests.

# Coding Style
- Airbnb 

# Language
- Javascript


## Limitations
+ Users cannot choose to accept invitation request
+ Users cannot leave a group
+ Users cannot delete a message when sent
+ Users cannot see notification of new messages 
+ USers cannot see notification messages in real time 

## Contributions
 Contributions are always welcome. If you are interested in enhancing the features in the project, follow these steps below:
 + Fork the project to your repository then clone it to your local machine.
 + Create a new branch and make features that will enhance it.
 + If the you wish to update an existing enhancement submit a pull request.
 + If you find bugs in the application, create a `New Issue` and let me know about it.
 + If you need clarification on what is not clear, contact me via mail [chukwuebuka.nwamadi@andela.com](mailto:chukwuebuka.nwamadi@andela.com)

## Author
    Chukwuebuka Nwamadi

## License & Copyright
MIT © [Daniel Atebije](https://github.com/louisdante9)

Licensed under the [MIT License](LICENSE).


