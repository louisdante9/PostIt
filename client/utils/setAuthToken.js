 import axios from 'axios';

//  export function setAuthToken(token){
//       if(token){
//           axios.defaults.headers.common[ 'Authorization' ]=  `Bearer ${ token }`;
//       }else{
//          delete axios.defaults.headers.common[ 'Authorization' ];
//       }
//  }

 const setAuthToken = (token) => {
    token = token || localStorage.getItem('jwtToken');
    if(token) {
        axios.defaults.headers.common[ 'Authorization' ] = `${ token }`;
    } else {
        delete axios.defaults.headers.common[ 'Authorization' ];
    }
    return axios;
 };


 export default setAuthToken;

