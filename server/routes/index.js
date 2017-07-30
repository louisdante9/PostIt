import { Users, Groups, Messages } from '../controller';
import Authenticate from '../middleware/auth';

module.exports = (app) => {

    //Signup route
    app.post('/api/user/signup', Users.signup);

    //Signin routes
    app.post('/api/user/signin',Users.login);
     //Routes Creates a group
    app.post('/api/group', Authenticate.verifyToken, Groups.create);
    //Routes List All Groups
    app.get('/api/group', Authenticate.verifyToken, Groups.list);
    
    app.get('/api/group/:groupId/messages', Authenticate.verifyToken, Messages.getGroupMessage);
    app.post('/api/group/:groupId/messages', Authenticate.verifyToken, Messages.createNewMessage);
   
    
};