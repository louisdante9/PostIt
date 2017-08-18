import axios from '../utils/setAuthToken';
import { CREATE_USER_GROUP, GET_USER_GROUP, GET_GROUP_MESSAGES, CREATE_GROUP_MESSAGE,GET_ALL_USERS, ADD_USER_TO_GROUP} from './types';

export function getGroups() {
   return dispatch => {
        axios().get('/api/group')
            .then(res => {
                dispatch({
                    type: GET_USER_GROUP,
                    payload: res.data
                });
            })
            .catch(err => console.log(err.response.data));
    };
}

export function createGroup(groupData) {
    return dispatch => {
         return axios().post('/api/group', groupData)
             .then(res => {
                 console.log(res.data.data);
                 dispatch({
                     type: CREATE_USER_GROUP,
                     payload: res.data.data
                 });
             })
             .catch(err => console.log(err.response));
     };
 }

 export function getMessages(groupId) {
    return dispatch => {
         return axios().get(`/api/group/${groupId}/messages`)
             .then(res => {
                 dispatch({
                     type: GET_GROUP_MESSAGES,
                     payload: res.data.messages
                 });
             })
             .catch(err => console.log(err));
     };
 }

 export function createMessage(groupId, data) {
    return dispatch => {
         return axios().post(`/api/group/${groupId}/messages`, data)
             .then(res => {
                 dispatch({
                     type: CREATE_GROUP_MESSAGE,
                     payload: Object.assign({}, res.data, {User: data})
                 });
             })
             .catch(err => console.log(err.response));
     };
 }
//actions for adding users....
  export function searchUser(groupId, data) {
    return dispatch => {
         return axios().post(`/api/group/${groupId}/messages`, data)
             .then(res => {
                 dispatch({
                     type: GET_ALL_USERS,
                     payload: res.data
                 });
             })
             .catch(err => console.log(err.response));
     };
 }

 export function addUsers(groupId, data) {
    return dispatch => {
         return axios().post(`/api/group/${groupId}/user`, data)
             .then(res => {
                 dispatch({
                     type: ADD_USER_TO_GROUP,
                     payload:res.data
                 });
             })
             .catch(err => console.log(err.response));
     };
 }