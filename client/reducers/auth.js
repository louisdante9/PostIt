import {USER_AUTHENTICATED} from '../actions/types';
import isEmpty from 'lodash/isEmpty';


const initialState =  { 
    active: false, 
    user: {}
};

export default  (state = initialState, action = {} ) => {
    switch(action.type) {
        case 'USER_AUTHENTICATED':
            return {
                active: !isEmpty(action.user),
                user: action.user
            };
        default: 
            return state;
    }
};


