import { combineReducers } from 'redux';
import auth from './reducers/auth';
import groups  from './reducers/group';
import messages from './reducers/messages';

export default combineReducers({
    auth,
    groups,
    messages
});