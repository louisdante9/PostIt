/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import faker from 'faker';

const factory = {
  users: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
   
  },
  
  firstUser: {
    username: 'faker',
    email: 'factory@email.com',
    password: 'password',
   
  },
//creates random name for tests
  secondUser: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
    
  },

  wrongUser: {
    username: undefined,
    email: 'factory@email.com',
    password: 'password',
  },

};
export default factory;