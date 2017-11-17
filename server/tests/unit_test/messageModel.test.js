import chai from 'chai';
import models from '../../models';
import messageData from '../helpers/message.helper';

const should = chai.should();

const { message } = messageData;

describe('Message model', () => {
  it('should create a message', (done) => {
    models.Message.create(message.demoMessage).then((newMessage) => {
      newMessage.message.should.equal(message.demoMessage.message);
      newMessage.flag.should.equal(message.demoMessage.flag);
      newMessage.groupId.should.equal(message.demoMessage.groupId);
      newMessage.userId.should.equal(message.demoMessage.userId);
    });
    done();
  });
  it('should not create a message if message body is empty', (done) => {
    models.Message.create(message.demoMessage3).then().catch((error) => {
      error.errors[0].message.should.equal('Message can not be empty');
    });
    done();
  });
  it('should not create a message if message priority is null', (done) => {
    models.Message.create(message.demoMessage4).then().catch((error) => {
      error.errors[0].message.should
      .equal('Flag value must be one of: normal, urgent or critical');
    });
    done();
  });
  it('should not create a message if message readby is null', (done) => {
    models.Message.create(message.demoMessage5).then().catch((error) => {
      error.errors[0].message.should.equal('readby cannot be null');
    });
    done();
  });
});