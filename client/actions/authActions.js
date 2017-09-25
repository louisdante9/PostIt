 import axios from 'axios';
 import setAuthToken from '../utils/setAuthToken'; 
 import jwtDecode from 'jwt-decode';
 import { USER_AUTHENTICATED, RESET_PASSWORD_SUCCESS } from './types';


export function setCurrentUser(user) {
    return {
        type: USER_AUTHENTICATED,
        user
    };
}
export function login(data) {
    return dispatch => {
        return axios.post('/api/user/signin', data).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            dispatch(setCurrentUser(decode(token)));
        });
    };
}

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('/api/user/signup', userData).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            dispatch(setCurrentUser(decode(token)));
            
        });
    };
}



export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
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

const confirmPasswordResetSuccess = password => ({
    type: 'RESET_PASSWORD_SUCCESS',
     password
  });
  
  const confirmPasswordResetFailed = password => ({
    type: 'RESET_PASSWORD_FAILED',
     password
  });
  
  export const confirmPasswordResetRequest = (token, newPassword) => dispatch =>
    axios.post(`/api/user/resetpassword/${token}`, newPassword)
      .then((response) => {
        dispatch(confirmPasswordResetSuccess(response));
        Materialize.toast('Password reset successful', 6000, 'green');
        history.push('/login');
      })
      .catch((err) => {
        dispatch(confirmPasswordResetFailed(err));
        console.log(err)
        Materialize.toast(err.response.data.err, 3000, 'red');
      });
