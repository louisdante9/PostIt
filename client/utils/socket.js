import { store } from './../index';
import { CREATE_USER_GROUP, GET_USER_GROUP, INCREASE_UNREAD_MESSAGE, GET_GROUP_MESSAGES, CREATE_GROUP_MESSAGE, GET_ALL_USERS, ADD_USER_TO_GROUP } from './../actions/types';

const socket = io();

socket.on('groupMessage', (data) => {
  const state = store.getState();
  console.log(state)
  const { activeGroup } = state.messages;
  store.dispatch({
    type: CREATE_GROUP_MESSAGE,
    payload: data,
    groupId: data.groupId
  });
  console.log(data)
  if(activeGroup === data.groupId){
    socket.emit('readMessage', {
      messageId: data.id,
      groupId: data.groupId,
      userId: data.userId
    });
  }else{
    console.log(data, 'inc')
    store.dispatch({
      type: INCREASE_UNREAD_MESSAGE,
      groupId: data.groupId
    });
  }
});

export default socket;