import axios from 'axios';

/**
 * 
 * @desc this method sets authetication for a signed up or signed in user
 * @param {any} token 
 * @returns { void }
 */
const setAuthToken = (token) => {
  token = token || localStorage.getItem('jwtToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
  return axios;
};
export default setAuthToken;

