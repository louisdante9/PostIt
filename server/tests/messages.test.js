/* eslint no-unused-expressions: 0 */
/* eslint import/no-unresolved: 0 */
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import db from '../models';

const expect = chai.expect;
const request = supertest(app);
let token, group;

before((done) => {
  request
    .post('/api/v1/user/signup')
    .send({
      username: 'louis',
      email: 'louisdante9@gmail.com',
      password: 'biology1'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      token = res.body.token;
      request
        .post('/api/v1/group')
        .set('authorization', token)
        .send({ name: 'group1', description: 'New group' })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          group = res.body.groupData;
          done();
        });
    });
});
describe('messagesControllersTests', () => {
  describe(
    'Given the user hits the route /api/v1/group/:groupId/messages',
    () => {
      it('returns (401 status) Unauthorized Access', (done) => {
        request
          .post(`/api/v1/group/${group.id}/messages`)
          .send({ message: 'A new new message', flag: 'critical' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.status).to.equal(401);
            done();
          });
      });
      it('returns (403 status) Invalid Access', (done) => {
        request
          .post(`/api/v1/group/${group.id}/messages`)
          .set('authorization', "token")
          .send({ message: 'A new new message', flag: 'critical' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.status).to.equal(403);
            done();
          });
      });
      it('returns 201 and creates a message successfully', (done) => {
        request
          .post(`/api/v1/group/${group.id}/messages`)
          .set('authorization', token)
          .send({ message: 'A new new message', flag: 'critical' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.status).to.equal(201);
            done();
          });
      });
      it(
        'returns 201 status and creates a message with priority urgent', 
        (done) => {
          request
            .post(`/api/v1/group/${group.id}/messages`)
            .set('authorization', token)
            .send({ message: 'A new new message', flag: 'urgent' })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(res.status).to.equal(201);
              done();
            });
        }
      );  
      it(
        `returns 404 status when a user posts
       a message to a  group that does not exist`, 
        (done) => {
          request
            .post(`/api/v1/group/${group.id * 5}/messages`)
            .set('authorization', token)
            .send({ message: 'A new new message', flag: 'urgent' })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(res.status).to.equal(404);
              done();
            });
        }
      );
 
      it(
        'returns 404 and should not get messages from a group that does not exist', 
        (done) => {
          request
            .get(`/api/v1/group/${group.id * 5}/messages`)
            .set('authorization', token)
            .send({ message: 'A new new message', flag: 'critical' })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(res.status).to.equal(404);
              done();
            });
        }
      );  
      it('returns 201 response and creates a messages successfully', (done) => {
        request
          .post(`/api/v1/group/${group.id}/messages`)
          .set('authorization', token)
          .send({
            message: 'test message'
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.status).to.equal(201);
            done();
          });
      });
      it('returns 201 and creates a message with priority level critical', (done) => {
        request
          .post(`/api/v1/group/${group.id}/messages`)
          .set('authorization', token)
          .send({
            message: 'test message',
            priority: 'critical'
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.status).to.equal(201);
            done();
          });
      });
      it('should send a message with priority level urgent', (done) => {
        request
          .post(`/api/v1/group/${group.id}/messages`)
          .set('authorization', token)
          .send({
            message: 'test message',
            priority: 'urgent'
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.status).to.equal(201);
            done();
          });
      });
      it('returns 200 and gets all messages in a group', (done) => {
        request
          .get(`/api/v1/group/${group.id}/messages`)
          .set('authorization', token)
          .send()
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.status).to.equal(200);
            done();
          });
      });
    }
  );
  describe('Given the user hits the route /api/v1/user/searchuser', () => {
    it('returns 200 and usernames of search parameter sent', (done) => {
      const query = 'G',
        limit = 5,
        offset = 0;
      request
        .get(`/api/v1/user/searchuser`)
        .set('authorization', token)
        .query({ name: query, limit, offset })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it(
      'should return 404 status when no search parameter is sent', 
      (done) => {
        const query = '',
          offset = 0;
        request
          .get(`/api/v1/user/searchuser`)
          .set('authorization', token)
          .query({ name: query, offset })
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(404);
            done();
          });
      }
    );
  });
  describe('Given the user hits the route /api/v1/user/reqpass', () => {
    it('returns 404 if user email doesn\'t exist', (done) => {
      request
        .post('/api/v1/user/reqpass')
        .send({
          email: 'tony@test.com'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('returns 401 if email is not sent', (done) => {
      request
        .post('/api/v1/user/reqpass')
        .send()
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should send an email to the  user with reset link', (done) => {
      request
        .post('/api/v1/user/reqpass')
        .send({
          email: 'louisdante9@gmail.com'
        })
        .end((err, res) => {
          token = res.body.token;
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('Given the user hits the route /api/v1/user/resetpassword/:token', () => {
    it('returns 201 and resets the password successfully', (done) => {
      request
        .post(`/api/v1/user/resetpassword/${token}`)
        .send({
          newPassword: 'biology@1',
          confirmPassword: 'biology@1'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('returns 401 and fails to reset password', (done) => {
      request
        .post('/api/v1/user/resetpassword/jjhhhh')
        .send({
          newPassword: 'biology@1',
          confirmPassword: 'biology@1'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
});
