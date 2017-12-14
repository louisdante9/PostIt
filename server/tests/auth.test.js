/* eslint no-unused-expressions: 0 */
/* eslint import/no-unresolved: 0 */
// import 'babel-polyfill';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import fakerObj from './helpers/auth.helper';

const { expect } = chai;
const request = supertest(app);
let token;

describe('Test setup', () => {
  describe('Creating a new user', () => {
    it('should return 201 response on successful user registration', (done) => {
      request
        .post('/api/v1/user/signup')
        .send(fakerObj.users)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.user.email).to.equal(fakerObj.users.email);
          done();
        });
    });
    it('should retunrn (409 error) for duplicate email', (done) => {
      request
        .post('/api/v1/user/signup')
        .send(fakerObj.users)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });
    it(
      'should return an error if one of the request fields is empty', 
      (done) => {
        request
          .post('/api/v1/user/signup')
          .send(fakerObj.wrongUser)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(400);
            done();
          });
      }
    );
  });

  describe('Logging in a user', () => {
    it('should successfully log in a registered user', (done) => {
      request
        .post('/api/v1/user/signin')
        .send(fakerObj.users)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return an error if the password field is empty', (done) => {
      request
        .post('/api/v1/user/signin')
        .send(fakerObj.wrongUser2)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return an error if the email field is empty', (done) => {
      request
        .post('/api/v1/user/signin')
        .send(fakerObj.wrongUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('(400 error) with invalid email format', (done) => {
      request
        .post('/api/v1/user/signup')
        .send({
          email: 'test',
          username: 'testusername3',
          password: 'testpassword',
          phone: '07069473974'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});