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

let token, wrongUser, userParams;

describe('Auth Suite', () => {

  before((done) => {
    db.sequelize.sync().then(() => {
      userParams = factory.users;
      wrongUser = factory.wrongUser;
      done();
    });
  });

  after((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

  describe('Create User POST: /api/user/signup', () => {
    it('should successfully create a new user on successful registration', (done) => {
      request
        .post('/api/user/signup')
        .send({
          email: 'testuser@email.com',
          username: 'testuser1',
          password: 'testuser2',
          phone: '07030742489'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('(409 error) with duplicate email', (done) => {
      request
        .post('/api/user/signup')
        .type('form')
        .send({
          email: 'testuser@email.com',
          username: 'testuser2',
          password: 'testuser',
          phone: '07030742489'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('should return an error when the signup form is missing a field', (done) => {
      request
        .post('/api/user/signup')
        .send(wrongUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('Login User: /api/users/signin', () => {
    it('should successfully log in a registered user', (done) => {
      request
        .post('/api/user/signin')
        .send({ email: 'testuser@email.com', password: 'testuser2' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          // expect(res.token).to.be.defined;
          done();
        });
    });

    it('should return an error if the password field is empty', (done) => {
      request
        .post('/api/user/signin')
        .send({ email: userParams.email, password: '' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should return an error if the email field is empty', (done) => {
      request
        .post('/api/user/signin')
        .send({ email: '', password: userParams.password })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('(400 error) with invalid email format', (done) => {
      request
        .post('/api/user/signup')
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