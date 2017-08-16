import { GET_GROUP_MESSAGES, CREATE_GROUP_MESSAGE  } from '../actions/types';

const initialState = [];


export default (state = initialState, action) => {
    switch(action.type) {
        case GET_GROUP_MESSAGES:
            return action.payload;
        case CREATE_GROUP_MESSAGE:
            return [...state, action.payload];
        default:
            return state;
    }
};