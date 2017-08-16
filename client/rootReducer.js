import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import groups  from './reducers/group';
import messages from './reducers/messages';

export default combineReducers({
    flashMessages,
    auth,
    groups,
    messages
});