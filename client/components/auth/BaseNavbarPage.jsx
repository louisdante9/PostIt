import React from 'react';
import { PropTypes } from 'prop-types';
import NavigationBar from '../common/NavigationBar.jsx';


const BaseNavbarPage = (props) => (
  <div className="page-wrapper">
    <NavigationBar />
    {props.children}
  </div>
);

export default BaseNavbarPage;