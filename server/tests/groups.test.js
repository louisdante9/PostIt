/* eslint no-unused-expressions: 0 */
/* eslint import/no-unresolved: 0 */
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import fakerObj from './helpers/auth.helper';
import db from '../models';

const { expect } = chai;
const request = supertest(app);

const server = supertest.agent(app);
let token;
before((done) => {
  request
    .post('/api/v1/user/signup')
    .send(fakerObj.thirdUser)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      token = res.body.token;
      done();
    });
});
describe('groupsControllersTests', () => {
  describe('Given the user hits the route /api/v1/group/', () => {
    it('returns 201 status and creates a new group', (done) => {
      request
        .post('/api/v1/group/')
        .set('authorization', token)
        .send({ name: 'Test Group', description: 'A simple test group' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should return 400 response if the group doesn\'t exist', (done) => {
      request
        .post('/api/v1/group/')
        .set('authorization', token)
        .send({ name: '', description: '' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('returns 409 response for duplicated group names', (done) => {
      request
        .post('/api/v1/group/')
        .set('authorization', token)
        .send({ name: 'Test Group', description: 'A simple test group' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('returns 200 and all groups', (done) => {
      request
        .get('/api/v1/group/')
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('Given the user hits the route /api/v1/group/:groupId/user', () => {
    it(
      'should return 201 response if user is successfully added to group',
      (done) => {
        request
          .post(`/api/v1/group/1/user`)
          .set('authorization', token)
          .send({
            userId: 1
          })
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(201);
            done();
          });
      }
    );
    it(
      'should return 404 status if the group doesn\'t exist', 
      (done) => {
        request
          .post(`/api/v1/group/100/user`)
          .set('authorization', token)
          .send({
            userId: 1
          })
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(404);
            done();
          });
      }
    );
    it(
      'should return 409 status if the user is already a member of the group',
      (done) => {
        request
          .post(`/api/v1/group/1/user`)
          .set('authorization', token)
          .send({
            userId: 1
          })
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(409);
            done();
          });
      }
    );
    it(
      'should return 400 status if the user does not exist',
      (done) => {
        request
          .post(`/api/v1/group/1/user`)
          .set('authorization', token)
          .send({
            userId: 5
          })
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(400);
            done();
          });
      }
    );
    describe(
      'Given the user hits the route /api/v1/group/:groupId/user/list', 
      () => {
        it('returns 200 and users in a group', (done) => {
          request
            .get('/api/v1/group/1/user/list')
            .set('authorization', token)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(200);
              done();
            });
        });
        it('should return 404 if group doesn\'t exit', (done) => {
          request
            .get('/api/v1/group/100/user/list')
            .set('authorization', token)
        
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(404);
              done();
            });
        });
        it('should return 400 if wrong params are sent', (done) => {
          request
            .get('/api/v1/group/n/user/list')
            .set('authorization', token)
        
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(400);
              done();
            });
        });
      }
    );
  });
  describe('Given the user hits the route /api/v1/group/:groupId/user', () => {
    it(
      'should return 200 response if user is successfully removed from a group',
      (done) => {
        request
          .delete(`/api/v1/group/1/user`)
          .set('authorization', token)
          .send({
            userId: 1
          })
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            done();
          });
      }
    );
  });
  it('should return 404 if the user is already deleted from group', (done) => {
    request
      .delete(`/api/v1/group/1/user`)
      .set('authorization', token)
      .send({
        userId: 1
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        done();
      });
  });
  it(
    'should return 404 to add a user to a group that doesn\'t exist',
    (done) => {
      request
        .delete(`/api/v1/group/100/user`)
        .set('authorization', token)
        .send({
          userId: 1
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
    }
  );
});
