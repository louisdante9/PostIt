import groups from '../../reducers/groupUser';
import * as types from '../../actions/types';
import expect from 'expect';

describe('group reducer', () => {
  it('should return an initial state', () => {
    expect(groups(undefined, {})).toEqual([]);
  });
  it('should handle GET_USER_IN_A_GROUP', () => {
    const initialState = [];
    const action = {
      type: types.GET_USER_IN_A_GROUP,
      payload: [
        {
          id: 1,
          userId: 1,
          groupId: 1,
          User:{
          id: 1,
          username: "louisdante9"
          }
        }
      ]
    };
    const expectedAction = [ {
      id: 1,
      userId: 1,
      groupId: 1,
      User:{
      id: 1,
      username: "louisdante9"
      }
    }];
    expect(
      groups(initialState, action)
    ).toEqual(expectedAction);
  });
});