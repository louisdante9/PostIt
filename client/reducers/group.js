import { CREATE_USER_GROUP, GET_USER_GROUP } from '../actions/types';

const initialState = [];


export default (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_GROUP:
            return action.payload;
        case CREATE_USER_GROUP:
            console.log(action.payload);
           return [ action.payload, ...state];
        default:
            return state;
    }
};