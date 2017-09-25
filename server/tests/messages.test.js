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

describe('Messages suite', () => {
  userParams = factory.users;

  before((done) => {
    db.sequelize.sync().then(() => {
      request
        .post('/api/user/signup')
        .send(userParams)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          token = res.body.token;
          request
            .post('/api/group')
            .set('authorization', token)
            .send({ name: 'group1', description: 'New group' })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              group = res.body.data;
              done();
            });
        });
    }).catch((error) => {
    });
  });

  after((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      done();
    })
  });

  describe('Create Messages', () => {
    it('allows a user create a message successfully', (done) => {
      request
        .post(`/api/group/${group.id}/messages`)
        .set('authorization', token)
        .send({ message: 'A new new message', flag: 'critical' })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.equal(201);
          done();
        })
    });


    it('should not create a message if the group does not exist', (done) => {
      request
        .post(`/api/group/${group.id * 5}/messages`)
        .set('authorization', token)
        .send({ message: 'A new new message', flag: 'critical' })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  it('should not get messages from a group that does not exist', (done) => {
    request
      .get(`/api/group/${group.id * 5}/messages`)
      .set('authorization', token)
      .send({ message: 'A new new message', flag: 'critical' })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(400);
        done();
      });
  });

  describe('Add user to a new group', () => {
    it('should return 200 to add a user to a group', (done) => {
      request
      .post('/api/user/signup')
      .send({ 
        email: 'testuser@email.com',
        username: 'testuser2',
        password: 'testuser',
        phone: '07030742489'
    })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        token = res.body.token;
      request
      .post('/api/group/1/user/')
      .set('authorization', token)
      .send({
        userId: 2
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
//   describe('Send message to a group', () => {
//     it('returns 200 response', (done) => {
//       request
//       .post('/api/group/1/message/')
//       .set('authorization', token)
//       .send({
//         message: 'test message'
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         expect(res.status).to.equal(200);
//         done();
//       });
//     });
//     it('should work with priority level critical', (done) => {
//       request
//       .post('/api/group/1/message/')
//       .set('authorization', token)
//       .send({
//         message: 'test message',
//         priority: 'critical'
//       })
//       .end((err, res) => {
//         if(err){
//           return done(err);
//         }
//         expect(res.status).to.equal(201);
//         done();
//       });
//     });
//     it('should work with priority level urgent', (done) => {
//       request
//       .post('/api/group/1/message/')
//       .set('authorization', token)      
//       .send({
//         message: 'test message',
//         priority: 'urgent'
//       })
//       .end((err, res) => {
//         if(err){
//           return done(err)
//         }
//         expect(res.status).to.equal(201);
//         done();
//       });
//     });
//     it('should not with priority level high', (done) => {
//       request
//       .post('/api/group/1/message/')
//       .set('authorization', token)      
//       .send({
//         message: 'test message',
//         priority: 'high'
//       })
//       .end((err, res) => {
//         if(err){
//           return done(err)
//         }
//         expect(res.status).to.equal(400)
//         done();
//       });
//     });
//     describe('View all messages in a group', () => {
//       it('returns 200 response', (done) => {
//         request
//         .get('/api/group/1/messages/')
//         .set('authorization', token)              
//         .send()
//         .end((err, res) => {
//           if(err){
//             return done(err);
//           }
//           expect(res.status).to.equal(200);
//           done();
//         });
//       });
//     });
   });
 });