import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';
import { provider } from 'react-redux';
import  BrandLogo from '../../components/common/BrandLogo.jsx';

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('BrandLogo', () => {
  const props = {
    textColor: 'white'
  }
  const component = mount(<BrandLogo {...props} />);
  it('should render link once', () => {
    expect(component.length).toEqual(1);
  });
  it('should renders a div', () => {
    expect(component.find('Link').length).toBeGreaterThan(0);
  });
});
