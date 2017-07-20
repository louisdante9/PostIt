// {
//   'development': {
//     'username': 'louis',
//     'password': 'biology1',
//     'database': 'postit-dev',
//     'host': '127.0.0.1',
//     'port': 5432,
//     'dialect': 'postgres'
//   },
//   'test': {
//     'username': 'louis',
//     'password': 'biology1',
//     'database': 'postit-test',
//     'host': '127.0.0.1',
//     'port': 5432,
//     'dialect': 'postgres'
//   },
//   'production':{
//     'use_env_variable':'DATABASE_URL'
//   }
// }
require('dotenv').config();

module.exports = {
  development: {
    username: 'louis',
    password: 'biology1',
    database: 'postit-dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    use_env_variable:'DATABASE_URL_TEST'
  },
  production:{
    use_env_variable:'DATABASE_URL'
  }
};
