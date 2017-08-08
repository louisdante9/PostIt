/* eslint no-unused-expressions: 0 */
/* eslint import/no-unresolved: 0 */
//import 'babel-polyfill';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import factory from './helpers/user.helper';
import db from '../models';

const expect = chai.expect;
const request = supertest(app);

const server = supertest.agent(app);
let userParams, wrongUser, token, group;

describe('Messages Routes', () => {
  userParams = factory.users;

  before((done) => {
    db.User.sequelize.sync({ force: true }).then(() => {
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
                return err;
              }
              group = res.body.data;
              done();
            });
        });
    });
  });

  after((done) => {
    db.Message.sequelize.sync({ force: true}).then(() => {
      db.GroupUser.sequelize.sync({ force: true }).then(() => {
        db.Group.sequelize.sync({ force: true }).then(() => {
          db.User.sequelize.sync({ force: true }).then(() => {
            done();
          });
        });
      });
    });
  });

  describe('Create Messages', () => {
    it('allows a user create a message successfully', (done) => {
      request
        .post(`/api/group/${group.id}/messages`)
        .set('authorization', token)
        .send({ message: 'A new new message', flag: 'critical'})
        .end((err, res) => {
          if (err) {
            return err;
          }
          expect(res.status).to.equal(201);
          done();
        })
    });


    it('should not create a message if the group does not exist', (done) => {
      request
        .post(`/api/group/${group.id * 5}/messages`)
        .set('authorization', token)
        .send({ message: 'A new new message', flag: 'critical'})
        .end((err, res) => {
          if (err) {
            return err;
          }
          expect(res.status).to.equal(404);
          done();
        })
    })
  });

  it('should not create a message if the group does not exist', (done) => {
    request
      .gwt(`/api/group/${group.id * 5}/messages`)
      .set('authorization', token)
      .send({ message: 'A new new message', flag: 'critical'})
      .end((err, res) => {
        if (err) {
          return err;
        }
        expect(res.status).to.equal(404);
        done();
      })
  })