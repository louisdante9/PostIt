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
          group = res.body.data;
          done();
        });
    });
});
describe('Test setup', () => {
  describe('for messages route', () => {
    it('returns Unauthorized Access', (done) => {
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
    it('returns Invalid Access', (done) => {
      request
        .post(`/api/v1/group/${group.id}/messages`)
        .set('authorization', "token")
        .send({ message: 'A new new message', flag: 'critical' })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should allow a user create a message successfully', (done) => {
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
    it('should allow a user create a message successfully with priority', (done) => {
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
    });  
    it('should not create a message if the group does not exist', (done) => {
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
    });
  });
  it('should not get messages from a group that does not exist', (done) => {
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
  });
  it('should return 201 to add a user to a group', (done) => {
    token;
    request
      .post(`/api/v1/group/2/user`)
      .set('authorization', token)
      .send({
        userId: 3
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(201);
        done();
      });
  });
  
  it('returns 201 response', (done) => {
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
  it('should send a message with priority level critical', (done) => {
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
  it('should get all messages in a group', (done) => {
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
  it('should successfully search for other users', (done) => {
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
    'should return an error when no search or limit parameter is sent', 
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
  it('should not send an email if user email doesn\'t exist', (done) => {
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
  it('should not send request if email is empty', (done) => {
    request
      .post('/api/v1/user/reqpass')
      .send()
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
  describe('for users', () => {
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
    it('should reset password successfully', (done) => {
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
    it('should fail password reset', (done) => {
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