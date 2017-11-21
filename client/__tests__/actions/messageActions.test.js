import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actions from '../../actions/groupAction';
import * as types from '../../actions/types';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Message actions', () => {
  describe('getMessage action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should contain getMessages function', () => {
      expect(actions.getMessages()).toBeA('function');
    });
    it('should dispatch GET_GROUP_MESSAGES action when called', (done) => {
      moxios.stubRequest('/api/v1/group/1/messages', {
        status: 200,
        response: {}
      });
      const store = mockStore({});
      const data = {
        id: 1,
        message: "yo",
        flag: "normal",
        msgRead: null,
        groupId: 1,
        userId: 1,
        User: {
          id: 1,
          username: "louisdante9",
          email: 'louisdante9@gmail.com',
          phone: '0808997776667',
          resetPasswordToken: null,
          expiryTime: null,
        }
      };
      let groupId = 1;
      
      const expectedActions = [
        {
          type: types.GET_GROUP_MESSAGES,
          payload: data,
          groupId
        }
      ];
      store.dispatch((actions.getMessages(groupId))).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });

   });

  describe('Create Message Action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should contain createMessage function', () => {
      expect(actions.createMessage()).toBeA('function');
    });
    it('should dispatch CREATE_USER_GROUP action creator', (done) => {
      const store = mockStore({});
      moxios.stubRequest('/api/v1/group/1/messages', {
        status: 200,
        response: {

        }
      });
      const data = {
        id: 1,
        message: "yo",
        userId: 1,
        flag: "normal",
        groupId: 1,
        msgRead: null,
        User: {
          groupId: 15,
          message: "hello",
          flag: "normal",
          userId: 1,
          username: "louisdante9",
        }
      };
      let groupId = 1;
      const messageData = {
        groupId: 1,
        message: 'yo',
        flag: 'normal',
        userId: 1,
        username: 'louisdante9'

      };

      const expectedActions = [
        {
          type: types.CREATE_GROUP_MESSAGE,
          payload: data,
          groupId
        }
      ];

      store.dispatch(actions.createMessage(groupId, messageData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  });
});