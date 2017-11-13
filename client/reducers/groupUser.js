import { GET_USER_IN_A_GROUP } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
      case GET_USER_IN_A_GROUP:
          return action.payload;
      default:
          return state;
  }
};