import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';
import { provider } from 'react-redux';
import  BrandLogo from '../../components/common/BrandLogo.jsx';

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('BrandLogo', () => {
  let props = {
    textColor: 'white'
  }
  const component = mount(<BrandLogo {...props} />);
  it('should render link atleast once', () => {
    expect(component.length).toEqual(1);
  });
  it('renders a div', () => {
    expect(component.find('Link').length).toBeGreaterThan(0);
  });
});
