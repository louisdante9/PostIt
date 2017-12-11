/* 
global jest 
expect 
*/
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { provider } from 'react-redux';
import { ChangePasswordForm } 
from '../../components/auth/ChangePasswordForm.jsx';
import mockData from '../../../__mocks__/mockData';

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('ChangePasswordForm', () => {
  const props = {
    confirmPasswordResetRequest: jest.fn(() => Promise.resolve()),
    params: {
      token: 'abcdefghijklmnopqrstuvwxyz'
    }
  };
  const component = mount(<ChangePasswordForm {...props } />);
  it('should render atleast once', () => {
    expect(component.length).toEqual(1);
  });
  it('renders a div', () => {
    expect(component.find('div').length).toBeGreaterThan(0);
  });
  it('always renders signup form', () => {
    expect(component.find('form').length).toBe(1);
  });
  it('always renders a signup form with the inputs required', () => {
    expect(component.find('TextFieldGroup').length).toBe(2);
  });

  it('always renders a form submit button ', () => {
    expect(component.find('button').length).toBe(1);
  });
  it('calls onChange method', () => {
    const event = mockData.changePasswordDate;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });
  it('calls onSubmit method with valid data', () => {
    component.setState(mockData.changePasswordState);
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
