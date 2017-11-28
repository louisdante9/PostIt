import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';
import { provider } from 'react-redux';
import { Welcome } from '../../components/groupevents/welcome.jsx';

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('Welcome page', () => {
  const component = mount(<Welcome />);
  it('should render atleast once', () => {
    expect(component.length).toEqual(1);
  });
  it('renders a div', () => {
    expect(component.find('div').length).toBeGreaterThan(0);
  });
});
