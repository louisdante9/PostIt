import React from 'react';
import { Link } from 'react-router';

export default () =>{
    return(
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <Link to="/" class="brand-logo">POST-IT</Link>
            <img alt=""/>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#">Download App</a></li>
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/signin">Signup</Link></li>
              <li><a onClick="openSignInNav()">Sign in</a></li>
            </ul>
          </div>
        </nav>
       </div>
    );
};