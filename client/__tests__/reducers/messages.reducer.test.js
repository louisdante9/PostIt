import messages, { initialState } from '../../reducers/messages';
import { Reducer } from 'redux-testkit';
import * as types from '../../actions/types';
import expect from 'expect';

describe('group reducer', () => {
  it('should return an initial state', () => {
    expect(messages(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_GROUP_MESSAGES', () => {
    const action = {
      type: types.GET_GROUP_MESSAGES,
      payload: [{
          id: 1,
          message: 'yo', 
          flag: 'normal', 
          msgRead: null, 
          groupId: 1, 
          userId: 1, 
          User: { 
            id: 1, 
            username: 'louisdante9', 
            email: 'louisdante9@gmail.com', 
            phone: '0808997776667', 
            resetPasswordToken: null, 
            expiryTime: null 
        }
      }], 
      groupId: 1, 
    };
    const result = messages(undefined, action);
    expect(result.msg[action.groupId]).toEqual(action.payload);   
  });
  it('should handle CREATE_GROUP_MESSAGE', () => {

    const actions = {
      type: types.CREATE_GROUP_MESSAGE,
      payload: {
        id: 33,
        message: "hello",
        userId: 1,
        flag: "normal",
        groupId: 2,
        msgRead: null,
          User: { 
            groupId: 2,
            message: "hello",
            flag: "normal",
            userId: 1,
            username: "louisdante9"
        }
      }, 
      groupId: 1, 
    };
    let groupId = 1
    const result = messages(initialState, actions);
    expect(result.msg[actions.groupId]).toEqual([actions.payload]);    
  });
  it('should handle INCREASE_UNREAD_MESSAGE', () => {
    const action = {
      type: types.INCREASE_UNREAD_MESSAGE,
      groupId: 1, 
    };
    expect(
      messages(undefined, action).unread[action.groupId]).toEqual(1);    
  });
});