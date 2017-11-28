/* 
global jest 
expect 
*/

import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { provider } from 'react-redux';
import  Message from '../../components/groupevents/Messages.jsx';
import mockData from '../../../__mocks__/mockData';

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('Message', () => {
  let props = mockData.messagesProps;
  const component = mount(<Message {...props } />);
  it('should render atleast once', () => {
    expect(component.length).toEqual(1);
  });
  it('renders a li tag', () => {
    expect(component.find('li').length).toBeGreaterThan(0);
  });
});
