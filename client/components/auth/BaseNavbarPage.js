import React from 'react';
import NavigationBar from '../NavigationBar';


const BaseNavbarPage = (props) => (
  <div>
    <NavigationBar />
    {props.children}
  </div>
)
export default BaseNavbarPage;