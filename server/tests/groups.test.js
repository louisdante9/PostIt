/* eslint no-unused-expressions: 0 */
/* eslint import/no-unresolved: 0 */
//import 'babel-polyfill';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import fakerObj from './helpers/auth.helper';
import db from '../models';

const expect = chai.expect;
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
describe('groups suite', () => {
  it('returns 201 response', (done) => {
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
  it('returns 400 response', (done) => {
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
  it('returns all groups', (done) => {
    request
      .get('/api/v1/group/')
      .set('authorization', token)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
  describe('Add user to a new group', () => {
    it('should return 200 to add a user to a group', (done) => {
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
    });
    it('should return 200 to add a user to a group', (done) => {
      request
        .post(`/api/v1/group/100/user`)
        .set('authorization', token)
        .send({
          userId: 1
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should return 200 to add a user to a group', (done) => {
      request
        .post(`/api/v1/group/1/user`)
        .set('authorization', token)
        .send({
          userId: 1
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return users in a group', (done) => {
      request
        .get('/api/v1/group/1/user/list')
        .set('authorization', token)
        
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return users in a group', (done) => {
      request
        .get('/api/v1/group/100/user/list')
        .set('authorization', token)
        
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should return users in a group', (done) => {
      request
        .get('/api/v1/group/n/user/list')
        .set('authorization', token)
        
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});
