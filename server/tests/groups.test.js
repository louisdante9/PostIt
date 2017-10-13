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
    .post('/api/user/signup')
    .send(fakerObj.thirdUser)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      token = res.body.token;
      console.log(token, 'this is the token result ');
      done();
    });
});
describe('groups suite', () => {
  it('returns 201 response', (done) => {
    request
      .post('/api/group/')
      .set('authorization', token)
      .send({ name: 'Test Group', description: 'A simple test group' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        done();
      });
  });
  describe('Add user to a new group', () => {
    it('should return 200 to add a user to a group', (done) => {
      request
        .post(`/api/group/1/user`)
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
  });
});