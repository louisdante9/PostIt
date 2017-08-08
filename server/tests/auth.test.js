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
    userParams = factory.users;
    wrongUser = factory.wrongUser;
    done();
  });

  after((done) => {
    db.User.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

  describe('Create User POST: /api/user/signup', () => {
    it('should successfully create a new user on successful registration', (done) => {
      request
        .post('/api/user/signup')
        .send(userParams)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(201);
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

    it('should return an error when an existing user registers again',
      (done) => {
        request
          .post('/api/user/signup')
          .send(userParams)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(409);
            done();
          });
      });
  });

  describe('Login User POST: /api/users/login', () => {
    it('should successfully log in a registered user', (done) => {
      request
        .post('/api/user/signin')
        .send({ email: userParams.email, password: userParams.password })
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
  });
});