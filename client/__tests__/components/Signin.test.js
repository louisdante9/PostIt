import React from 'react';
import configureMockStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import expect from 'expect';
import { SigninForm } from '../../components/auth/SigninForm.jsx';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });
// jest.dontMock();
/* global expect Materialize*/
const mockStore = configureMockStore([thunk]);
sinon.spy(SigninForm.prototype, 'onChange');
sinon.spy(SigninForm.prototype, 'handleErrors');

describe('<SigninForm/>', () => {
  const props = {
    login: sinon.stub().resolves()
  };
  const router = {
    push: sinon.spy()
  };
 
  const wrapper = mount(<SigninForm { ...props} />, { context: { router }});

  afterEach(() => {
    router.push.reset();
  });

  describe('<form />', () => {
    it('should check if all <TextFieldGroup /> are defined', () => {
      expect(wrapper.find('TextFieldGroup').length).toBe(2);
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
        expect(router.push.calledOnce).toBe(true);
        done();        
      });
    });
    it('Should test for Signin form input', ()=>{
      wrapper.find('TextFieldGroup').at(0).simulate('change');
      expect(SigninForm.prototype.onChange.called).toBe(true);
    });
  });
});
describe('<SigninForm/>', () => {
  const newProps = {
    login: sinon.stub().rejects({
        response: {
          data: {
            errors: 'Error'
          }
      }
    })
  };
  const router = {
    push: sinon.spy()
  };
 
  const wrapper = mount(<SigninForm { ...newProps} />, { context: { router }});

  afterEach(() => {
    router.push.reset();
  });

  describe('<form />', () => {
    it('should return an error', (done) => {
      wrapper.setState({ email: 'tree@tree.com', password: 'password' });
      
      wrapper.find('form').simulate('submit');
      setImmediate(() => {
        expect(wrapper.state('isLoading')).toBe(false);
        expect(Materialize.toast.callCount).toBe(6);
        done();        
      });
      
    });
  });
});

describe('<SigninForm/>', () => {
  const newProps = {
    login: sinon.stub().rejects({
        response: {
          data: {
            errors: 'Error'
          }
        }
    })
  };
  const router = {
    push: sinon.spy()
  };
 
  const wrapper = mount(<SigninForm { ...newProps} />, { context: { router }});

  afterEach(() => {
    router.push.reset();
  });

  describe('<form />', () => {

    it('should return call handleError method', (done) => {
      wrapper.setState({ email: '', password: '' });
      wrapper.find('form').simulate('submit');
      setImmediate(() => {
        expect(wrapper.state('isLoading')).toBe(false);
        done();        
      });   
    });
  });
});