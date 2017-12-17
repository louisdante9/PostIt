/* 
global jest 
expect 
*/

import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { provider } from 'react-redux';
import { ForgotPasswordForm } 
  from '../../components/auth/ForgotPasswordForm.jsx';
import mockData from '../../../__mocks__/mockData';

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('ForgotPasswordForm', () => {
  const props = {
    userSignupRequest: jest.fn(() => Promise.resolve()),
    resetPassword: jest.fn(() => Promise.resolve({
      res: {
        status: '200'
      }
    }))
  };
  const component = mount(<ForgotPasswordForm {...props} />);
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
    expect(component.find('TextFieldGroup').length).toBe(1);
  });

  it('always renders a form submit button ', () => {
    expect(component.find('button').length).toBe(1);
  });
  it('calls onChange method', () => {
    const event = mockData.forgotPasswwordData;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls onSubmit method with valid data', () => {
    component.setState(mockData.forgotPasswwordState);
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('calls onSubmit method but fails', () => {
    const newProps = {
      userSignupRequest: jest.fn(() => Promise.resolve()),
      resetPassword: jest.fn(() => Promise.reject({
        error: {
          response: {
            data: {
              err: 'error'
            }
          }
        }
      }))
    };
    const wrapper = mount(<ForgotPasswordForm {...newProps} />);
    wrapper.setState(mockData.forgotPasswwordState);
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
