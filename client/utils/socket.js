import axios from 'axios';
import { store } from '../utils/store';
import { CREATE_USER_GROUP, GET_USER_GROUP, 
  INCREASE_UNREAD_MESSAGE, GET_GROUP_MESSAGES, 
  CREATE_GROUP_MESSAGE, GET_ALL_USERS, 
  ADD_USER_TO_GROUP } from './../actions/types';

/* globals io */

const socket = io();

socket.on('groupMessage', (messageData) => {
  const state = store.getState();  
  const { messages: { activeGroup }, auth: { user: { userId } } } = state;
  store.dispatch({
    type: CREATE_GROUP_MESSAGE,
    payload: messageData,
    groupId: messageData.groupId
  });
  if (activeGroup === data.groupId) {
    socket.emit('readMessage', {
      messageId: messageData.id,
      groupId: messageData.groupId,
      userId: messageData.userId
    });
  } else {
    store.dispatch({
      type: INCREASE_UNREAD_MESSAGE,
      groupId: messageData.groupId
    });
    increaseUnread(userId, messageData.groupId);
  }
});

/**
* 
* @desc this function returns number of unread messages 
* @param {any} userId 
* @param {any} groupId 
* @returns { void }
*/
const increaseUnread = (userId, groupId) => {
  axios().post(`/api/v1/group/${groupId}`, { userId });
};
export default socket;