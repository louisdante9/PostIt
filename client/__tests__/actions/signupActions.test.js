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

describe('actions', () => {
  describe('Sign up action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should contain userSignupRequest function', () => {
      expect(actions.userSignupRequest()).toBeA('function');
    });
    it('should contain setCurrentUser object', () => {
      expect(actions.setCurrentUser()).toBeA('object');
    });
    it('should contain confirmPasswordResetRequest object', () => {
      expect(actions.confirmPasswordResetRequest()).toBeA('function');
    });
    it('should dispatch setCurrentUser action', () => {
      const auth = {
        active: true,
        user: {
          id: 1,
          email: 'louisdante9@andela.com',
          username: 'louisdante9'
        }
      };
      const userData = {
        id: 1,
        email: 'louisdante9@andela.com',
        username: 'louisdante9'
      };
      const expectedAction = { 
        type: types.USER_AUTHENTICATED, 
        user: auth.user
      };
      expect(actions.setCurrentUser(userData)).toEqual(expectedAction);
    });
    it(
      'creates an action USER_AUTHENTICATED on successful user sign up',
      (done) => {
        moxios.stubRequest('/api/v1/user/signup', {
          status: 201,
          response: {
            success: true,
            message: 'Sign up succesful.',
            token: 'iSX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
          }
        });
        const store = mockStore({});
        const auth = {
          active: true,
          user: {
            id: 1,
            email: 'louisdante9@andela.com',
          }
        };
        const userData = {
          username: 'louis',
          email: 'louis@andela.com',
          password: 'BioLoGy@1',
          phone: '2349069473974'
        };
        const expectedActions = [
          { type: types.USER_AUTHENTICATED, user: auth.user }
        ];
        store.dispatch(actions.userSignupRequest(userData)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
      }
);
  });
  describe('confirm Password reset', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    const store = mockStore({});
    const payLoad = {
      username: 'louisdante9',
      email: 'mcdavidemereuwa95@gmail.com',
      token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk',
      newPassword: 'qwertyu'
    };
    const token = '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk';
  
    it('should dispatch RESET_PASSWORD_SUCCESS', (done) => {
      moxios.stubRequest(`/api/user/resetpassword/${payLoad.token}`, payLoad, {
        status: 201,
        response: {
          data: {
            token
          }
        }
      });
      const expectedActions = [
        { type: types.RESET_PASSWORD_SUCCESS }
      ];
      store.dispatch(actions
        .confirmPasswordResetRequest(payLoad.token, payLoad)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  
    it('should dispatch RESET_PASSWORD_FAILED if an error occurs', (done) => {
      moxios.stubRequest(`/api/user/resetpassword/${payLoad.token}`, payLoad, {
        status: 401,
        response: {
          message: 'Error.',
          data: {
            token
          }
        }
      });
      const expectedActions = [
        { type: types.RESET_PASSWORD_FAILED }
      ];
      store.dispatch(actions
        .confirmPasswordResetRequest(payLoad.token, payLoad))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});