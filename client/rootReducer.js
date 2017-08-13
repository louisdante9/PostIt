import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import groups  from './reducers/group';

export default combineReducers({
    flashMessages,
    auth,
    groups
});