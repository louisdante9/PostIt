import chai from 'chai';
import models from '../../models';
import userData from '../helpers/user.helper';

const should = chai.should();

const { user } = userData;

describe('User model', () => {
  it('should create a user', (done) => {
    models.User.create(user.demoUser).then((createdUser) => {
      createdUser.username.should.equal(user.demoUser.username);
      createdUser.email.should.equal(user.demoUser.email);
      createdUser.phone.should.equal(user.demoUser.phone);
      done();
    });
  });
  it('should not create a user if username is empty', (done) => {
    models.User.create(user.demoUser2).then().catch((error) => {
      error.errors[0].message.should.equal('Username can not be empty');
    done();
    });
  });

  it('should not create a user if email is wrong', (done) => {
    models.User.create(user.demoUser3).then().catch((error) => {
      error.errors[0].message.should.equal('Email address must be valid');
    done();
    });
  });
  it('should not create a user if user password is shorter than 5 character', (done) => {
    models.User.create(user.demoUser4).then().catch((error) => {
      error.errors[0].message.should.equal('Your password is too short');
      done();
    });
  });

});