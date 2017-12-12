import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { USER_AUTHENTICATED, RESET_PASSWORD_SUCCESS } from './types';

/* global Materialize */

/**
 * 
 * 
 * @export
 * @param {any} user 
 * @returns {void}
 */
export function setCurrentUser(user) {
  return {
    type: USER_AUTHENTICATED,
    user
  };
}
/**
 * 
 * 
 * @desc this function signs in a user
 * @param {any} data 
 * @returns {void}
 */
export function login(data) {
  return dispatch => axios.post('/api/v1/user/signin', data).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(decode(token)));
  });
}
/**
 * 
 * 
 * @desc this method signs up a user 
 * @param {any} userData 
 * @returns {void}
 */
export function userSignupRequest(userData) {
  return dispatch => axios.post('/api/v1/user/signup', userData).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(decode(token)));
  });
}

/**
 * 
 * 
 * @desc this method logs out a user
 * @returns {void}
 */
export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentGroup');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}

/**
 *  
 * @desc this function resets a users password  
 * @param {any} emailData 
 * @returns {void}
 */
export function resetPassword(emailData) {
  return () => axios.post('/api/v1/user/reqpass', emailData);
}


/**
 * 
 * @desc this function returns a jwt token 
 * @param {any} token 
 * @returns {void}
 */
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
/**
 * 
 * @desc this function confirms the users changed password 
 * @param {any} token 
 * @param {any} newPassword
 * @returns {void} 
 */
const confirmPasswordResetRequest = (token, newPassword) =>
  dispatch =>
    axios.post(`/api/v1/user/resetpassword/${token}`, newPassword)
      .then((response) => {
        dispatch(confirmPasswordResetSuccess(response));
        Materialize.toast('Your Password has been changed successful, please go on and signin', 3000, 'green');
        history.push('/login');
      })
      .catch((err) => {
        dispatch(confirmPasswordResetFailed(err));
        Materialize.toast(err.response.data.err, 3000, 'red');
      });
