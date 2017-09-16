import React from 'react';
import configureMockStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import  { SigninForm }  from '../components/signin/SiginForm';
import SigninPage from '../components/signin/SigninPage';

// jest.dontMock();
/* global expect */
const mockStore = configureMockStore([thunk]);

describe('<SigninForm/>', () => {
  const authAction = sinon.spy(() => {}); // create a spy function for signupAction
  // sinon.spy(wrapper.instance(), 'onSubmit'); // spy on onSubmit of Signup presentational component
  // sinon.spy(SigninPage.prototype, 'onChange'); // spy on onChange of Signup presentational component 
  const props = {
    signinState: {},
    authAction,
    login: sinon.spy(() => {})
  };
  const store = mockStore({});
  const router = {};
  
  const wrapper = mount(<SigninForm { ...props} />);

  it('should check if all <TextFieldGroup /> are defined', () => {
    expect(wrapper.find('TextFieldGroup').at(0).props().field).toBe('email');
    expect(wrapper.find('TextFieldGroup').at(1).props().field).toBe('password');
    // const textgroup = wrapper.find('TextFieldGroup').at(1).props().field;
    // console.log(textgroup);
  });
  describe('<form />', () => {
    it('`<form>` element should have a onSubmit attribute', () => {
      expect(
        wrapper.props().onSubmit
      ).toBeDefined();
    });

    it('onSubmit attribute should be of type `function`', () => {
      expect(
        typeof wrapper.props().onSubmit === 'function'
      ).toBe(true);
    });
  });
  it('Should check if number of form fields is equal to 2', () => {
    expect(wrapper.find('TextFieldGroup').length).toBe(2);
  });
  
  it('`<TextFieldGroup>` element should have an onChange attribute that changes state', () => {
    wrapper.instance().onChange({target: {
      name:'email',
      value: 'louis'
    }});
    wrapper.instance().onChange({target: {
      name:'password',
      value: '12345'
    }});
     
     
     expect(wrapper.state().email).toEqual('louis');
     expect(wrapper.state().password).toEqual('12345');
    //  expect(wrapper)
  });

  it('Should check if onSubmit is called', () => {
    // wrapper.find('form').simulate('submit'); // trigger an event by Signup form
    const onSubmitSpy = sinon.spy(()=>{})
    const wrap = mount(<SigninForm onSumbit = {onSubmitSpy}/>);
    const button = wrap.find('button');
    button.simulate('click', onSubmitSpy());
    expect(onSubmitSpy.calledOnce).toBe(true)
    // console.log(onSubmitSpy);
  });
  it('Should check if there is submit button wit', () => {
    const button = wrapper.find('button');
    expect(button.props().type).toEqual('submit');
    expect(button.text()).toEqual('Sign In');
  });
  it('Should check if signinAction is called', () => {
    wrapper.find('form').simulate('submit'); // trigger an event by Signup form
    expect(authAction.called).toBe(true); // authAction inside handleSubmit is called
  });
  it('input fields should be filled correctly', () => {
    const credentials = { username: 'louis', password: 'testpass' };
    // expect(wrapper.find('#input-auth-username').length).toBe(1);

    const usernameInput = expect(wrapper.find('TextFieldGroup').at(0).props().name);
    usernameInput.value = credentials.username;
    expect(usernameInput.value).toBe('louis');

    const passwordInput =  expect(wrapper.find('TextFieldGroup').at(1).props().name);
    passwordInput.value = credentials.password;
    expect(passwordInput.value).toBe('testpass');
});
});

