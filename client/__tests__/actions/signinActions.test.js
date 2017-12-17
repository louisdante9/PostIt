/* global window */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actions from '../../actions/authActions';
import * as types from '../../actions/types';
import mockLocalStorage from '../../../__mocks__/mockLocalStorage';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Sign in action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const userData = {
    username: 'louis',
    password: 'password'
  };

  it('should contain a logout function', () => {
    expect(actions.logout()).toBeA('function');
  });
  it('should contain a login function', () => {
    expect(actions.login()).toBeA('function');
  });
  it('should contain setCurrentUser object', () => {
    expect(actions.setCurrentUser()).toBeA('object');
  });
  it(
    'should dispatch an action USER_AUTHENTICATED on successful user sign up',
    (done) => {
      const store = mockStore({});
      moxios.stubRequest('/api/v1/user/signin', {
        status: 201,
        response: {
          success: true,
          message: 'Sign in succesful.',
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      });
      const expectedActions = [
        { type: types.USER_AUTHENTICATED }
      ];
      store.dispatch(actions.login(userData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    }
  );
  it(
    'should dispatch an action SET_CURRENT_USER on successful user logout',
    () => {
      const store = mockStore({});
      const expectedActions = [
        { type: types.USER_AUTHENTICATED, user: {} }
      ];
      store.dispatch(actions.logout());
      expect(store.getActions()).toEqual(expectedActions);
    }
  );
});