import reducer from '../reducers/flashMessages';
import { Reducer } from 'redux-testkit';
import * as actionTypes from '../actions/types';
import expect from 'expect';


const initialState = []

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
     initialState
    );
  });

  it('should not affect state', () => {
    Reducer(reducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });
  it('should create a flash message', () => {
    const user = {id: 1, text: 'this should work for reducer test'};
    const action = {id: 1, type: actionTypes.ADD_FLASH_MESSAGE, user};
    console.log(action)
    Reducer(reducer).expect(action).toReturnState({...initialState, user });
  });
  // it('should handle USER_AUTHENTICATED', () => {
  //   expect(
  //     reducer({}, {
  //       type: types.USER_AUTHENTICATED,
  //       active: false
  //     })
  //   ).toEqual([
  //     {
  //       active: false,
  //       user: false,
        
  //     }
  //   ])

    
  // })
})