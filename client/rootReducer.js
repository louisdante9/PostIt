import { combineReducers } from 'redux';
import auth from './reducers/auth';
import groups  from './reducers/group';
import messages from './reducers/messages';
import groupUser from './reducers/groupUser';

export default combineReducers({
    auth,
    groups,
    messages,
    groupUser
});