import axios from '../utils/setAuthToken';
import { CREATE_USER_GROUP, GET_USER_GROUP, GET_GROUP_MESSAGES, CREATE_GROUP_MESSAGE,GET_ALL_USERS, ADD_USER_TO_GROUP, INCREASE_UNREAD_MESSAGE} from './types';
import socket from './../utils/socket';

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
                     payload: res.data.messages,
                     groupId
                 });
                 dispatch({
                     type: INCREASE_UNREAD_MESSAGE,
                     
                 })
             })
             .catch(err => console.log(err));
     };
 }

 export function createMessage(groupId, data) {
    return dispatch => {
         return axios().post(`/api/group/${groupId}/messages`, data)
             .then(res => {
                 const payload = Object.assign({}, res.data, {User: data});
                 socket.emit('newMessage', payload);
                 dispatch({
                     type: CREATE_GROUP_MESSAGE,
                     payload,
                     groupId
                 });
             })
             .catch(err => console.log(err.response));
     };
 }
//actions for adding users....


 export function addUsers(groupId, userId) {
     console.log(userId);
    return dispatch => {
         return axios().post(`/api/group/${groupId}/user`, {userId})
             .then(res => {
                 dispatch({
                     type: ADD_USER_TO_GROUP,
                     payload:res.data
                 });
             })
             .catch(err => console.log(err.response));
     };
 }

