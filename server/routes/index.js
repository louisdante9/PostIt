import { Users, Groups, Messages, GroupUsers } from '../controller';
import Authenticate from '../middleware/auth';

module.exports = (app) => {
  app.post('/api/user/signup', Users.signup);
  app.post('/api/user/signin', Users.login);
  app.get('/api/user/search', Users.search);

  app.post('/api/group', Authenticate.verifyToken, Groups.create);
  app.get('/api/group', Authenticate.verifyToken, Groups.list);
  app.post('/api/group/:groupId/user', Authenticate.verifyToken, GroupUsers.addUsersToGroup);
  app.get('/api/group/:groupId/messages', Authenticate.verifyToken, Messages.getGroupMessage);
  app.post('/api/group/:groupId/messages', Authenticate.verifyToken, Messages.createNewMessage);
  app.post('/api/user/resetpassword/:token', Users.resetpassword);
  app.post('/api/user/reqpass', Users.requestnewpassword);
};