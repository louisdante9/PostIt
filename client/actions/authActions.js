 import axios from 'axios';
 import setAuthToken from '../utils/setAuthToken'; 
 import jwtDecode from 'jwt-decode';
 import {USER_AUTHENTICATED} from './types';


export function setCurrentUser(user){
    return {
        type: USER_AUTHENTICATED,
        user

    };
}
export function login(data){
    return dispatch => {
        return axios.post('/api/user/signin', data).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            dispatch(setCurrentUser  (decode(token)));
        });
    };
}

export function logout() {
    return dispatch => {
        dispatch({
            type: 'LOGOUT_USER'
        });
        localStorage.removeItem('jwtToken');
    };
}

export function authenticate(payload) {
    return dispatch => {
        dispatch({
            type: 'USER_AUTHENTICATED',
            payload
        });
    };
}

function decode(token) {
    return jwtDecode(token);
}