import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actions from '../../actions/groupAction';
import * as types from '../../actions/types';
import mockLocalStorage from '../../../__mocks__/mockLocalStorage';

/* global jest Materialize */

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;
window.Materialize = {
  toast: () => (jest.fn())
};


describe('Add User Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should contain addUsers function', () => {
    expect(actions.addUsers()).toBeA('function');
  });

  it('should dispatch an ADD_USER_TO_GROUP action creator when called', (done) => {
    const store = mockStore({});
    const data = {
      success: true,
      message: "successfully added to group",
      id: 53
    };
    moxios.stubRequest('/api/group/1/user', {
      status: 201,
      response: data
    });
    const userId = 1;
    const groupId = 1;
    const expectedActions = [
      {
        type: types.ADD_USER_TO_GROUP,
        payload: data
      }
    ];
    store.dispatch(actions.addUsers(groupId, userId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Get User Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should contain loadGroupUsers function', () => {
    expect(actions.loadGroupUsers()).toBeA('function');
  });

  it('should dispatch GET_USER_IN_A_GROUP action creator when called', (done) => {
    const store = mockStore({});
    const data = {
      id: 1,
      userId: 1,
      groupId: 1,
      User: {
        id: 1,
        username: 'louisdante'
      }
    };
    moxios.stubRequest('/api/v1/group/1/user/list', {
      status: 201,
      response: data
    });
    const groupId = 1;
    const expectedActions = [
      {
        type: types.GET_USER_IN_A_GROUP,
        payload: data
      }
    ];
    store.dispatch(actions.loadGroupUsers(groupId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Get Group Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should contain getGroups function', () => {
    expect(actions.getGroups()).toBeA('function');
  });
  it('should dispatch GET_USER_GROUP action creator when called', (done) => {
    const store = mockStore({});
    const data = [{
      id: 1,
      name: "javascript",
      description: "this is a test"
    }];
    moxios.stubRequest('/api/v1/group', {
      status: 200,
      response: data
    });
    const expectedActions = [
      {
        type: types.GET_USER_GROUP,
        payload: data
      }
    ];
    store.dispatch(actions.getGroups()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Create Group Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should contain loadGroupUsers function', () => {
    expect(actions.createGroup()).toBeA('function');
  });
  it('should dispatch CREATE_USER_GROUP action creator when called', (done) => {
    const store = mockStore({});
    const data = [{
      data: {
        id: 1,
        name: "javascript",
        description: "this is a test"
      }
    }];
    moxios.stubRequest('/api/v1/group', {
      status: 200,
      response: data
    });
    const groupData = {
      name: 'javascript',
      description: 'this is a dev group'
    };
    const expectedActions = [
      {
        type: types.CREATE_USER_GROUP,
        payload: data.data
      }
    ];

    store.dispatch(actions.createGroup(groupData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});