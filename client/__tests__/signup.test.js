import React from 'react';
import configureMockStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import expect from 'expect';
import { SignupForm }  from '../components/auth/SignupForm.jsx';

// jest.dontMock();
/* global expect */
const mockStore = configureMockStore([thunk]);

describe('<SignupForm/>', () => {
  const props = {
    userSignupRequest: sinon.stub().resolves()
  };

 
  const wrapper = mount(<SignupForm { ...props} />);

  describe('<form />', () => {
    it('should check if all <TextFieldGroup /> are defined', () => {
      expect(wrapper.find('TextFieldGroup').length).toBe(4);
      expect(wrapper.find('TextFieldGroup')
      .at(0).props().field).toBe('email');
      expect(wrapper.find('TextFieldGroup')
      .at(1).props().field).toBe('password');
    });
    it('should setState on change of input fields', () => {
      wrapper.find('input').at(0)
      .simulate('change', { target: { value: 'TestChange', name: 'email' } });
      expect(wrapper.state('email')).toBe('TestChange');
    });
    it('should submit the form', (done) => {
      wrapper.setState({ email: 'tree@tree.com', password: 'password' });
      wrapper.find('form').simulate('submit');
      setImmediate(() => {
        expect(wrapper.state('isLoading')).toBe(true);
        expect(Materialize.toast.callCount).toBe(1);
        expect(browserHistory.push.calledOnce).toBe(true);
        done();        
      });
    });
  });
});

