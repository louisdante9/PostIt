import axios from 'axios';

export function userSignupRequest(userData){
    return dispatch => {
        return axios.post('/api/user/signup', userData);
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        dispatch(setCurrentUser(decode(token)));
    };
}