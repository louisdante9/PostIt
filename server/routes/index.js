import { Users, Groups, Messages, GroupUsers } from '../controller';
import Authenticate from '../middleware/auth';

module.exports = (app) => {
  app.post('/api/user/signup', Users.signup);
  app.post('/api/user/signin', Users.login);
  app.get('/api/user/searchuser', Users.searchUsers);
  app.get('/api/v1/group/:groupId/user/list',  Authenticate.verifyToken,GroupUsers.listGroupUsers);

  app.post('/api/group', Authenticate.verifyToken, Groups.create);
  app.get('/api/group', Authenticate.verifyToken, Groups.list);
  app.post('/api/group/:groupId/user', 
  Authenticate.verifyToken, GroupUsers.addUsersToGroup);
  app.get('/api/group/:groupId/messages', 
  Authenticate.verifyToken, Messages.getGroupMessage);
  app.post('/api/group/:groupId/messages', 
  Authenticate.verifyToken, Messages.createNewMessage);
  app.post('/api/user/resetpassword/:token', Users.resetPassword);
  app.post('/api/user/reqpass', Users.requestNewPassword);

};