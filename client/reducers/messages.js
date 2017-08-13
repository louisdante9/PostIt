//import { } from '../actions/types';

const initialState = [];


export default (state = initialState, action) => {
    switch(action.type) {
        //case GET_USER_GROUP:
            //return action.payload;
       // case CREATE_USER_GROUP:
           //return [ action.payload, ...state];
        default:
            return initialState;
    }
};