/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import faker from 'faker';

const fakerObj = {
  users: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.phoneNumber(), 
  },
  firstUser: {
    username: 'faker',
    email: 'factory@email.com',
    password: 'password',
  },
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
  wrongUser2: {
    username: faker.internet.userName(),
    email: 'factory@email.com',
    password: undefined,
  },
};

export default fakerObj;