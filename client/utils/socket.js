import {store} from './../index';
import { CREATE_USER_GROUP, GET_USER_GROUP, GET_GROUP_MESSAGES, CREATE_GROUP_MESSAGE,GET_ALL_USERS, ADD_USER_TO_GROUP} from './../actions/types';

const socket = io();

socket.on('groupMessage', (data)=>{
  store.dispatch({
    type: CREATE_GROUP_MESSAGE,
    payload: data
});
})

export default socket;