/* eslint no-unused-expressions: 0 */
/* eslint import/no-unresolved: 0 */
//import 'babel-polyfill';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import factory from './helpers/auth.helper';
import db from '../models';

const expect = chai.expect;
const request = supertest(app);

const server = supertest.agent(app);
let userParams, token, group;

// describe('groups suite', () => {
//   userParams = factory.users;

//   before((done) => {
//     db.sequelize.sync().then(() => {
//       request
//         .post('/api/user/signup')
//         .send(userParams)
//         .end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//           token = res.body.token;
//           request
//             .post('/api/group')
//             .set('authorization', token)
//             .send({ name: 'group1', description: 'New group' })
//             .end((err, res) => {
//               if (err) {
//                 return done(err);
//               }
//               group = res.body.data;
//               done();
//             });
//         });
//     }).catch((error) => {
//     });
//   });

//   after((done) => {
//     db.sequelize.sync({ force: true }).then(() => {
//       done();
//     });
//   });

//   it('returns 201 response', (done) => {
//     request
//     .post('/api/group/')
//     .set('authorization', token)
//     .send({ name: 'Test Group', description: 'A simple test group' })
//     .end((err, res) => {
//       if (err) {
//         return done(err);
//       }
//       expect(res.status).to.equal(201);
//       done();
//     });
//   });

// });