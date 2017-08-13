import axios from '../utils/setAuthToken';
import { CREATE_USER_GROUP, GET_USER_GROUP, GET_GROUP_MESSAGES,  CREATE_GROUP_MESSAGE} from './types';

export function getGroups() {
   return dispatch => {
        axios().get('/group')
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
    console.log(groupData, 'test');
    return dispatch => {
         axios().post('/group', groupData)
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
         axios().get(`/group/${groupId}/messages`)
             .then(res => {
                 dispatch({
                     type: GET_GROUP_MESSAGES,
                     payload: res.data.messages
                 });
             })
             .catch(err => console.log(err.response));
     };
 }
 export function createMessage(groupId) {
    return dispatch => {
         axios().post(`/group/${groupId}/messages`)
             .then(res => {
                 dispatch({
                     type: CREATE_GROUP_MESSAGE,
                     payload: res.data.messages
                 });
             })
             .catch(err => console.log(err.response));
     };
 }