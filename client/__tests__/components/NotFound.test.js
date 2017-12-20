import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';
import { provider } from 'react-redux';
import { NotFound } from '../../components/auth/NotFound.jsx';

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('Home page', () => {
  const component = mount(<NotFound />);
  it('should render atleast once', () => {
    expect(component.length).toEqual(1);
  });
  it('should render a div', () => {
    expect(component.find('div').length).toBeGreaterThan(0);
  });
});
