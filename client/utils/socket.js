import axios from 'axios';
import { store } from '../utils/store';
import { CREATE_USER_GROUP, GET_USER_GROUP, 
  INCREASE_UNREAD_MESSAGE, GET_GROUP_MESSAGES, 
  CREATE_GROUP_MESSAGE, GET_ALL_USERS, 
  ADD_USER_TO_GROUP } from './../actions/types';

/* globals io */

const socket = io();

socket.on('groupMessage', (data) => {
  const state = store.getState();  
  const { messages: { activeGroup }, auth: { user: { userId } } } = state;
  store.dispatch({
    type: CREATE_GROUP_MESSAGE,
    payload: data,
    groupId: data.groupId
  });
  if (activeGroup === data.groupId) {
    socket.emit('readMessage', {
      messageId: data.id,
      groupId: data.groupId,
      userId: data.userId
    });
  } else {
    store.dispatch({
      type: INCREASE_UNREAD_MESSAGE,
      groupId: data.groupId
    });
    increaseUnread(userId, data.groupId);
  }
});
export const increaseUnread = (userId, groupId) => {
  axios().post(`/api/v1/group/${groupId}`, { userId });
};
export default socket;