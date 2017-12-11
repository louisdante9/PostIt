/* 
global jest $
expect 
*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { provider } from 'react-redux';
import ConnectedDashboardHeader,
{ DashboardHeader } from '../../components/groupevents/DashboardHeader.jsx';
import mockData from '../../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  messages: {
    activeGroup: 1,
    msg: {},
    unread: {}
  }
});
//mock jquery
Object.defineProperty(window, '$', {
  value: () => ({
    collapsible: () => jest.fn()
  })
});

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('DashboardHeader component', () => {
  const props = {
    logout: jest.fn(),
    groups: mockData.dashboardGroupData,
    setGroupMessages: jest.fn(() => Promise.resolve()),
    unread: {},
    user: {}
  };
  const component = mount(<DashboardHeader {...props} />);
  it('should render atleast once', () => {
    expect(component.length).toEqual(1);
  });
  it('should renders a div', () => {
    expect(component.find('div').length).toBeGreaterThan(0);
  });
  it('should call mapStateToProps method once', () => {
    const wrapper = shallow(<ConnectedDashboardHeader
      {...props } store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
