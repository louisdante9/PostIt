/* 
global jest 
expect 
*/
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { provider } from 'react-redux';
import Modal 
  from '../../components/groupevents/modal.jsx';
import mockData from '../../../__mocks__/mockData';

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('Modal', () => {
  const props = {
    createGroup: jest.fn(() => Promise.resolve())
  };
  const component = mount(<Modal {...props} />);
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
    expect(component.find('input').length).toBe(1);
  });
  it('always renders a signup form with the inputs required', () => {
    expect(component.find('textarea').length).toBe(1);
  });

  it('always renders a form submit button ', () => {
    expect(component.find('button').length).toBe(2);
  });
  it('calls handleChange method', () => {
    const event = mockData.modalHandleChangeEvent;
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
    component.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });
  it('calls reset method', () => {
    const resetFormSpy = jest.spyOn(component.instance(), 'resetForm');
    component.instance().resetForm();
    expect(resetFormSpy).toHaveBeenCalled();
  });
  it('calls onSubmit method with valid data', () => {
    component.setState(mockData.modalState);
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    component.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
