import React from 'react';
import NavigationBar from '../common/NavigationBar.jsx';
import { PropTypes } from 'prop-types';


const BaseNavbarPage = (props) => (
  <div className="page-wrapper">
    <NavigationBar />
    {props.children}
  </div>
);

export default BaseNavbarPage;