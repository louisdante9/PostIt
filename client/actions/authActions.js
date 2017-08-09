 import axios from 'axios';
 import setAuthToken from '../utils/setAuthToken'; 

export function login(data){
    return dispatch => {
        return axios.post('/api/user/signin', data).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
        });
    };
}