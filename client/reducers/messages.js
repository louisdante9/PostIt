import { GET_GROUP_MESSAGES, CREATE_GROUP_MESSAGE, INCREASE_UNREAD_MESSAGE } from '../actions/types';

const initialState = {
    msg: {},
    unread: {},
    activeGroup: 1,
    // read: false
};

export default (state=initialState, action) => {
    console.log(action);
    switch(action.type) {
        case GET_GROUP_MESSAGES: {
            const { groupId, payload } = action;
            const groupMsgs = state.msg[groupId];
            return { ...state, msg: { ...state.msg, [groupId]: payload } };
        }
        case CREATE_GROUP_MESSAGE: {
            // case RECEIVE_GROUP_MESSAGE:
            const { groupId, payload } = action;
            // console.log(payload);
            const groupMsgs = state.msg[groupId] || [];
            const updatedMsg = [...groupMsgs, payload];
            return { ...state, msg: { ...state.msg, [groupId]: updatedMsg } };
        }
        case INCREASE_UNREAD_MESSAGE:{
            console.log(action.groupId, "unread");
            
            const unreadValue = (state.unread[action.groupId] || 0) + 1;
            const unread = { ...state.unread, [action.groupId]: unreadValue };
            return { ...state, unread };
        }
        default:
            return { ...state };
    }
};