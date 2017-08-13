 import axios from 'axios';


 const { host, protocol } = window.location;
 const BASE_URL = `${protocol}//${host}/api`;
  
 const setAuthToken = (token) => {
    token = token || localStorage.getItem('jwtToken');
    if(token) {
        axios.defaults.headers.common[ 'Authorization' ] = `${ token }`;
        axios.defaults.baseURL = BASE_URL;
    } else {
        delete axios.defaults.headers.common[ 'Authorization' ];
    }
    return axios;
 };


 export default setAuthToken;

