/* 
global jest 
expect 
*/

import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { provider } from 'react-redux';
import { SignupForm } from '../../components/auth/SignupForm.jsx';
import mockData from '../../../__mocks__/mockData';

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('Signup', () => {
  let props = {
    userSignupRequest: jest.fn(() => Promise.resolve())
  };
  const component = mount(<SignupForm {...props } />);
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
    expect(component.find('TextFieldGroup').length).toBe(4);
  });

  it('always renders a form submit button ', () => {
    expect(component.find('button').length).toBe(1);

  });
  it('calls onChange method', () => {
    const event = mockData.onChangeEvent;
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('calls onSubmit method with wrong data', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmitSpy = jest.spyOn(
      component.instance(), 'onSubmit'
    );
    component.instance().onSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('calls onSubmit method with valid data', () => {
    component.setState(mockData.onSubmitState);
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmitSpy = jest.spyOn(
      component.instance(), 'onSubmit'
    );
    component.instance().onSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });


  it('calls onSubmit method', () => {
    const newProps = {
      userSignupRequest: jest.fn(() => Promise.reject({
        err: {
          response: {
            data: {
              message: 'Error'
            }
          }
        }
      }))
    };
    const wrapper = mount(<SignupForm {...newProps } />);
    wrapper.setState(mockData.onSubmitState);
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onSubmit'
    );
    wrapper.instance().onSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('calls handleErrors method', () => {
    const handleErrorsSpy = jest.spyOn(
      component.instance(), 'handleErrors'
    );
    const errors = 'error';
    component.instance().handleErrors(errors);
    expect(handleErrorsSpy).toHaveBeenCalled();
  });
});
