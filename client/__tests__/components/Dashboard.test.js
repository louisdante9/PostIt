/* 
global jest 
expect 
*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { provider } from 'react-redux';
import mockLocalStorage from '../../../__mocks__/mockLocalStorage';
import connectedDashboard, { Dashboard } 
  from '../../components/groupevents/Dashboard.jsx';
import mockData from '../../../__mocks__/mockData';

// jest.dontMock();
configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;
const store = mockStore({
  groups: [],
  allMsgs: {},
  user: {},
});
// mock jquery
Object.defineProperty(window, '$', {
  value: () => ({
    collapsible: () => jest.fn(),
    modal: () => jest.fn(),
    sideNav: () => jest.fn(),
    ready: () => jest.fn()
  }) 
});

describe('UserSearchResult', () => {
  const props = {
    createGroup: jest.fn(() => Promise.resolve()),
    getGroups: jest.fn(() => Promise.resolve()),
    getMessages: jest.fn(() => Promise.resolve()),
    createMessage: jest.fn(),
    loadGroupUsers: jest.fn(),
    groups: [],
    user: {},
    active: true,
    allMsgs: {},
    logout: jest.fn(),
  };
  const component = shallow(<Dashboard {...props} />);
  it('should render atleast once', () => {
    expect(component.length).toEqual(1);
  });
  it('should render a div', () => {
    expect(component.find('div').length).toBeGreaterThan(0);
  });
  it('calls an onChange method', () => {
    const event = mockData.dashboardOnChangeEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });
  it('calls a logout method', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const logoutSpy = jest.spyOn(component.instance(), 'logout');
    
    component.instance().logout(event);
    expect(logoutSpy).toHaveBeenCalled();
  });
  it('calls a setGroupMessages method', () => {
    const event = { preventDefault: jest.fn() };
    const id = 1;
    const setGroupMessagesSpy = jest.spyOn(component.instance(), 'setGroupMessages');
    component.instance().setGroupMessages(event, id);
    expect(setGroupMessagesSpy).toHaveBeenCalled();
  });
  it('calls an onSubmit method', () => {
    const event = {
      preventDefault: jest.fn()
    };
    component.setState({
      groupId: 1,
      message: 'yo',
      flag: 'nnormal'
    });
    const handleSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
  it('calls a mapStateToProps method', () => {
    const wrapper = shallow(<connectedDashboard {...props} store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
