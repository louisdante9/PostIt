import groups from '../../reducers/group';
import { Reducer } from 'redux-testkit';
import * as types from '../../actions/types';
import expect from 'expect';

describe('group reducer', () => {
  it('should return an initial state', () => {
    expect(groups(undefined, {})).toEqual([]);
  });
  it('should handle GET_USER_GROUP', () => {
    const initialState = [];
    const action = {
      type: types.GET_USER_GROUP,
      payload: [
        {
          id: 1,
          name: "javascript",
          description: "this is a test",
          Users:{
          id: 1,
          username: "louisdante9",
          email: "louisdante9@gmail.com",
          phone: "09083999020",
          resetPasswordToken: null,
          expiryTime: null,
          GroupUser: {
          groupId: 1,
          userId: 1,
          isAdmin: true,
          unread: null,
          }
          }
        }
      ]
    };
    const expectedAction = [{
      id: 1,
      name: "javascript",
      description: "this is a test",
      Users:{
      id: 1,
      username: "louisdante9",
      email: "louisdante9@gmail.com",
      phone: "09083999020",
      resetPasswordToken: null,
      expiryTime: null,
      GroupUser: {
      groupId: 1,
      userId: 1,
      isAdmin: true,
      unread: null,
      }
      }
    }];
    expect(
      groups(initialState, action)
    ).toEqual(expectedAction);
  });
  it('should handle CREATE_USER_GROUP', () => {
    const initialState = [];    
    const action = {
      type: types.CREATE_USER_GROUP,
      payload: 
       {
        id: 16,
        name: "cod4",
        description: "this is a test"
       }
      
      
    };
    const expectedAction = [{
      id: 16,
      name: "cod4",
      description: "this is a test"
    }];
    expect(groups(initialState, action)).toEqual(expectedAction);
  });
});