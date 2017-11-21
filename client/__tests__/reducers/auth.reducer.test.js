// import reducer from '../../reducers/auth';
// import { Reducer } from 'redux-testkit';
// import * as actionTypes from '../../actions/types';
// import expect from 'expect';
// import deepFreeze from 'deep-freeze';


// const initialState =  { 
//   active: false, 
//   user: {}
// };

// describe('auth reducer', () => {
//   it('should return the initial state', () => {
//     expect(reducer(undefined, {})).toEqual(
//       {
//         active: false,
//         user: {}
//       }
//     );
//   });

//   it('should not affect state', () => {
//     Reducer(reducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
//   });
//   it('should store loggedin user', () => {
//     const user = {id: 1, name: 'louis'};
//     const expectedState = {active: true, user: {id: 1, name: 'louis'}};
//     const action = {type: actionTypes.USER_AUTHENTICATED, user};
//     Reducer(reducer).expect(action).toReturnState({...expectedState, user });
//   });
// });