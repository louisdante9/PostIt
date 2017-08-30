import React from 'react';

// jest.dontMock();
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { provider } from 'react-redux';
import HomePage from '../components/home/HomePage';

describe('Home page', () => {
  describe('test welcome page', () => {
    const component = mount(<HomePage />);
    
    it('should render atleast once', () => {
      expect(component.length).toEqual(1);
    });
  });
});
