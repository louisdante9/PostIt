import axios from '../utils/setAuthToken';
import {
  CREATE_USER_GROUP,
  GET_USER_GROUP, GET_GROUP_MESSAGES,
  CREATE_GROUP_MESSAGE, GET_ALL_USERS,
  ADD_USER_TO_GROUP, INCREASE_UNREAD_MESSAGE, GET_USER_IN_A_GROUP,
  DELETE_USER_FROM_GROUP
} from './types';
import socket from './../utils/socket';
/* global  Materialize */

/**
 * 
 * 
 * @desc this method get all group 
 * @returns {void}
 */
export function getGroups() {
  return dispatch => axios().get('/api/v1/group')
    .then(res => {
      dispatch({
        type: GET_USER_GROUP,
        payload: res.data
      });
    })
    .catch(err => err.response.data.message);
}

/**
 * 
 * 
 * @desc this method creates a new group
 * @param {any} groupData 
 * @returns {void}
 */
export function createGroup(groupData) {
  return dispatch => axios().post('/api/v1/group', groupData)
    .then(res => {
      dispatch({
        type: CREATE_USER_GROUP,
        payload: res.data.data
      });
      Materialize
        .toast('Group successfully created!', 6000, 'green');
    })
    .catch(err => err.response.data.message);
}

/**
 * 
 * 
 * @desc this function get all messages in a group
 * @param {any} groupId 
 * @returns {void}
 */
export function getMessages(groupId) {
  return dispatch => axios().get(`/api/v1/group/${groupId}/messages`)
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
    .catch(err => Materialize.toast(err.response.data, 3000, 'red'));
}

/**
 * 
 * 
 * @desc this function create a new message 
 * @param {any} groupId 
 * @param {any} data 
 * @returns {void}
 */
export function createMessage(groupId, data) {
  return dispatch => axios().post(`/api/v1/group/${groupId}/messages`, data)
    .then(res => {
      const payload = { ...res.data, User: data };
      socket.emit('newMessage', payload);
      dispatch({
        type: CREATE_GROUP_MESSAGE,
        payload,
        groupId
      });
    })
    .catch(err => Materialize
      .toast(err.response, 3000, 'red'));
}

/**
 * 
 * @desc this is a method for searching users that are in a group
 * @param {any} query
 * @param {any} limit
 * @param {any} offset
 * @returns {void}
 */
export function searcUser(query, limit, offset) {
  return () => axios().get(`/api/v1/user/searchuser?name=${query}&limit=
      ${limit}&offset=${offset}`);
}

/**
 * 
 * 
 * @desc this function is used to add users to a group
 * @param {any} groupId 
 * @param {any} userId 
 * @returns {void}
 */
export function addUsers(groupId, userId) {
  return dispatch => axios().post(`/api/v1/group/${groupId}/user`, { userId })
    .then(() => true)
    .catch(err => Materialize.toast(err.response, 3000, 'red'));
}

/**
 * 
 * 
 * @desc this function is used to removes users from a group
 * @param {any} groupId 
 * @param {any} userId 
 * @param {any} groupName
 * @returns {void}
 */
export function removeUsers(groupId, userId, groupName) {
  return () => axios().delete(`/api/v1/group/${groupId}/user`, { data: { userId } })
    .then(() => {
      Materialize.toast(`You left ${groupName.name} group`, 3000, 'green');
      return true;
    })
    .catch(err => Materialize.toast(err.response.data.message, 3000, 'red'));
}
/**
 * @desc this function loads users in a particular group
 * @param {any} groupId id of group in view
 * @return {void}
 */
export function loadGroupUsers(groupId) {
  return dispatch => axios().get(`/api/v1/group/${groupId}/user/list`)
    .then(({ data }) => dispatch({
      type: GET_USER_IN_A_GROUP,
      payload: data
    }), err => Materialize.toast(err.response, 3000, 'red'));
}
