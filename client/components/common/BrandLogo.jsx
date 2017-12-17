import React from 'react';
import { Link } from 'react-router';
import { PropTypes } from 'prop-types';
/**
 * 
 * @desc this functional component return the logo of the page
 * @param {any} props 
 * @returns { void }
 */
const BrandLogo = (props) => {
  const textColor = props.textColor || '';
  return (
    <Link to="/" className={`brand logo ${textColor}`} >
      <img src="/img/logo.png" alt="test" />
      <span>POST-IT</span>
    </Link>
  );
};
export default BrandLogo;