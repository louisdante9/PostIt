import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class NavigationBar extends React.Component{
  render(){
    return(
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <Link to="/" class="brand-logo logo">POST-IT</Link>
            <img alt=""/>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#">Download App</a></li>
              <li><Link to="/signup">Sign up</Link></li>
              <li><Link to="/signin">Sign in</Link></li>
            </ul>
          </div>
        </nav>
       </div>
    );
  }
}
// NavigationBar.propTypes = {
  // auth: React.PropTypes.object.isRequired
// };

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps)(NavigationBar);