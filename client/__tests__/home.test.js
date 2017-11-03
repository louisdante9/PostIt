import React from 'react';

// jest.dontMock();
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { provider } from 'react-redux';
import { Home } from '../components/auth/Home.jsx';

describe('Home page', () => {
  describe('test welcome page', () => {
    const component = mount(<Home />);
    
    it('should render atleast once', () => {
      expect(component.length).toEqual(1);
    });
  });
});
