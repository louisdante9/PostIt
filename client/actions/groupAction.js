import axios from '../utils/setAuthToken';
import {
  CREATE_USER_GROUP,
  GET_USER_GROUP, GET_GROUP_MESSAGES,
  CREATE_GROUP_MESSAGE, GET_ALL_USERS,
  ADD_USER_TO_GROUP, INCREASE_UNREAD_MESSAGE, GET_USER_IN_A_GROUP
} from './types';
import socket from './../utils/socket';
/* global  Materialize */

/**
 * 
 * 
 * @export
 * @returns {void}
 */
export function getGroups() {
  return dispatch => {
    return axios().get('/api/v1/group')
      .then(res => {
        dispatch({
          type: GET_USER_GROUP,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
}

/**
 * 
 * 
 * @export
 * @param {any} groupData 
 * @returns {void}
 */
export function createGroup(groupData) {
  return dispatch => {
    return axios().post('/api/v1/group', groupData)
      .then(res => {
        dispatch({
          type: CREATE_USER_GROUP,
          payload: res.data.data
        });
        Materialize
          .toast('Group successfully created!', 6000, 'green');
      })
      .catch(err => {
        Materialize
          .toast(err.response.data.err, 3000, 'red');
      });
  };
}

/**
 * 
 * 
 * @export
 * @param {any} groupId 
 * @returns {void}
 */
export function getMessages(groupId) {
  return dispatch => {
    return axios().get(`/api/v1/group/${groupId}/messages`)
      .then(res => {
        dispatch({
          type: GET_GROUP_MESSAGES,
          payload: res.data.messages,
          groupId
        });
        dispatch({
          type: INCREASE_UNREAD_MESSAGE,
        });
      })
      .catch(err => console.log(err));
  };
}

/**
 * 
 * 
 * @export
 * @param {any} groupId 
 * @param {any} data 
 * @returns {void}
 */
export function createMessage(groupId, data) {
  return dispatch => {
    return axios().post(`/api/v1/group/${groupId}/messages`, data)
      .then(res => {
        const payload = { ...res.data, User: data };
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

/**
 * 
 * @export
 * @param {any} query
 * @param {any} limit
 * @param {any} offset
 * @returns {void}
 */
export function userQuery(query, limit, offset) {
  return () => {
      return axios().get(`/api/v1/user/searchuser?name=${query}&limit=
      ${limit}&offset=${offset}`);
  };
}

/**
 * 
 * 
 * @export
 * @param {any} groupId 
 * @param {any} userId 
 * @returns {void}
 */
export function addUsers(groupId, userId) {
  return dispatch => {
    return axios().post(`/api/v1/group/${groupId}/user`, { userId })
      .then(res => {
        return dispatch({
          type: ADD_USER_TO_GROUP,
          payload: res.data
        });
      })
      .catch(err => console.log(err.response));
  };
}

/**
 * load users in a particular group
 * @export
 * @param {any} groupId id of group in view
 * @return {void}
 */
export function loadGroupUsers(groupId) {
  return dispatch => {
    return axios().get(`/api/v1/group/${groupId}/user/list` )
      .then(({ data }) => {
        return dispatch({
          type: GET_USER_IN_A_GROUP,
          payload: data
        });
      }, err => console.log(err.message));
  };
}
