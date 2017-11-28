import auth from '../../reducers/auth';
import { Reducer } from 'redux-testkit';
import * as types from '../../actions/types';
import expect from 'expect';


const initialState =  { 
  active: false, 
  user: {}
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(
      {
        active: false,
        user: {}
      }
    );
  });

  it('should not affect state', () => {
    Reducer(auth).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });
  it('should store loggedin user', () => {
    const user = {id: 1, name: 'louis'};
    const expectedState = {active: true, user: {id: 1, name: 'louis'}};
    const action = {type: types.USER_AUTHENTICATED, user};
    Reducer(auth).expect(action).toReturnState({...expectedState, user });
  });
});