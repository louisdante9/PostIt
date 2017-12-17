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
import ConnectedUserModal,
{ UserModal } from '../../components/groupevents/userModal.jsx';
import mockData from '../../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  groupUser: mockData.userModalState.groupUser
});
// jest.dontMock();
configure({ adapter: new Adapter() });

describe('UserModal', () => {
  const props = {
    addUsers: jest.fn(() => Promise.resolve()),
    searcUser: jest.fn(() => Promise.resolve({
      data: {
        users: {
          rows: [
            {
              id: 1,
              username: "ebuka"
            }
          ]
        }
      }
    })),
    group: 1
  };
  const component = mount(<UserModal {...props} />);
  it('should render atleast once', () => {
    expect(component.length).toEqual(1);
  });
  it('renders a div', () => {
    expect(component.find('div').length).toBeGreaterThan(0);
  });

  it('always renders a UserModal input', () => {
    expect(component.find('input').length).toBe(1);
  });

  it('always renders a  cancel button ', () => {
    expect(component.find('button').length).toBe(1);
  });
  it('calls handleChange method', () => {
    component.setState(mockData.userModalState);
    const event = {
      preventDefault: jest.fn(),
      target: {
        name,
        value: 'lo'
      },
    };
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
    component.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });
  it('calls handleChange method when input value is empty', () => {
    component.setState(mockData.userModalState);
    const event = {
      preventDefault: jest.fn(),
      target: {
        name,
        value: ''
      },
    };
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
    component.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });
  it('calls pageClick method', () => {
    component.setState(mockData.userModalState);
    const data = {
      selected: 1
    };
    
    const pageClickSpy = jest.spyOn(component.instance(), 'pageClick');
    component.instance().pageClick(data);
    expect(pageClickSpy).toHaveBeenCalled();
  });

  it('calls resetForm method', () => {
    component.setState(mockData.userModalState);
    
    const resetFormSpy = jest.spyOn(component.instance(), 'resetForm');
    component.instance().resetForm();
    expect(resetFormSpy).toHaveBeenCalled();
  });

  it('calls handleSelect method', () => {
    component.setState(mockData.userModalState);
    const user = {
      id: 1
    };
    
    const handleSelectSpy = jest.spyOn(component.instance(), 'handleSelect');
    component.instance().handleSelect(user);
    expect(handleSelectSpy).toHaveBeenCalled();
  });
  it('calls isGroupMember method', () => {
    component.setState(mockData.userModalState);
    const user = {
      id: 1
    };
    
    const isGroupMemberSpy = jest.spyOn(component.instance(), 'isGroupMember');
    component.instance().isGroupMember(user.id);
    expect(isGroupMemberSpy).toHaveBeenCalled();
  });
  it('calls componentWillReceiveProps method', () => {
    component.setState(mockData.userModalState);
    const user = {
      id: 1
    };
    
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(),
      'componentWillReceiveProps'
    );
    component.instance().componentWillReceiveProps(mockData.userModalState);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
  it('calls componentWillReceiveProps method', () => {
    const wrapper = shallow(<ConnectedUserModal {...props} store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
