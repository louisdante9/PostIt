import axios from 'axios';

const { host, protocol } = window.location;
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

