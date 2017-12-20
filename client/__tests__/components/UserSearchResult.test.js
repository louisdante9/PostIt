/* 
global jest 
expect 
*/

import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { provider } from 'react-redux';
import  {UserSearchResult} 
from '../../components/groupevents/UserSearchResult.jsx';
import mockData from '../../../__mocks__/mockData';

// jest.dontMock();
configure({ adapter: new Adapter() });

describe('UserSearchResult', () => {
  let props = {
    handleSelect: jest.fn(() => Promise.resolve()),
    userResult:[],
    pageCount: 0,
    pageClick: jest.fn(() => Promise.resolve())

  };
  const component = mount(<UserSearchResult {...props}/>);
  it('should render atleast once', () => {
    expect(component.length).toEqual(1);
  });
  it('renders a div', () => {
    expect(component.find('div').length).toBeGreaterThan(0);
  });
});
