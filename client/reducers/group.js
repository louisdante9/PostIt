import { CREATE_USER_GROUP, GET_USER_GROUP, GET_GROUP_MESSAGES, CREATE_GROUP_MESSAGE } from '../actions/types';

const initialState = [];


export default (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_GROUP:
            return action.payload;
        case CREATE_USER_GROUP:
           return [ action.payload, ...state];
        case GET_GROUP_MESSAGES:
            return action.payload;
        case CREATE_GROUP_MESSAGE:
            return [action.payload, ...state];
        default:
            return initialState;
    }
};