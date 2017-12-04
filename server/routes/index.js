import { Users, Groups, Messages, GroupUsers } from '../controller';
import authenticate from '../middleware/auth';

module.exports = (app) => {
  app.post('/api/v1/user/signup', Users.signup);
  app.post('/api/v1/user/signin', Users.login);
  app.get('/api/v1/user/searchuser', Users.searchUsers);
  app.get('/api/v1/group/:groupId/user/list',  authenticate.verifyToken,
  GroupUsers.listGroupUsers);
  app.post('/api/v1/group', authenticate.verifyToken, Groups.create);
  app.get('/api/v1/group', authenticate.verifyToken, Groups.list);
  app.post('/api/v1/group/:groupId/user', 
  authenticate.verifyToken, GroupUsers.addUsersToGroup);
  app.get('/api/v1/group/:groupId/messages', 
  authenticate.verifyToken, Messages.getGroupMessage);
  app.post('/api/v1/group/:groupId/messages', 
  authenticate.verifyToken, Messages.createNewMessage);
  app.post('/api/v1/user/resetpassword/:token', Users.resetPassword);
  app.post('/api/v1/user/reqpass', Users.requestNewPassword);
  app.post('/api/v1/group/:groupId', Messages.getGroupMessage)
};