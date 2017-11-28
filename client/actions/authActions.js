import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { USER_AUTHENTICATED, RESET_PASSWORD_SUCCESS } from './types';
/*global Materialize */
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
 * @export
 * @param {any} data 
 * @returns {void}
 */
export function login(data) {
    return dispatch => {
        return axios.post('/api/v1/user/signin', data).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            dispatch(setCurrentUser(decode(token)));
        });
    };
}
/**
 * 
 * 
 * @export
 * @param {any} userData 
 * @returns {void}
 */
export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('/api/v1/user/signup', userData).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            dispatch(setCurrentUser(decode(token)));
        });
    };
}

/**
 * 
 * 
 * @export
 * @returns {void}
 */
export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    };
}

/**
 *  
 * @export
 * @param {any} emailData 
 * @returns {void}
 */
export function resetPassword(emailData) {
    return () => {
        return axios.post('/api/v1/user/reqpass', emailData);
    };
}


/**
 * 
 * 
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

export const confirmPasswordResetRequest = (token, newPassword) => 
dispatch =>
    axios.post(`/api/v1/user/resetpassword/${token}`, newPassword)
        .then((response) => {
            dispatch(confirmPasswordResetSuccess(response));
            Materialize.toast('Password reset successful', 6000, 'green');
            history.push('/login');
    })
    .catch((err) => {
        dispatch(confirmPasswordResetFailed(err));
        Materialize.toast(err.response.data.err, 3000, 'red');
});
