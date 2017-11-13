import React from 'react';
import { Link, browserHistory, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import {PropTypes} from 'prop-types';

/**
 * 
 * @class NavigationBar
 * @extends {React.Component}
 */
class NavigationBar extends React.Component {

  /**
   * Creates an instance of NavigationBar.
   * @param {any} props 
   * @memberof NavigationBar
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
   * 
   * @param {any} event
   * @memberof NavigationBar
   * @returns {void}
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
   * 
   * 
   * @memberof NavigationBar
   * @returns {void}
   */
  render() {
    const navLogo = {
      marginLeft: 33,
      fontSize: 21,
      fontWeight: 200
    };
    const { active, user } = this.props.auth;
    const userLinks = (
      <span>
        <a data-activates="mobile-demo" className="button-collapse">
          <i className="material-icons">
            menu
      </i>
        </a>
        <ul className="side-nav" id="mobile-demo">
        <li><a onClick={this.logout}> Log out</a></li>
        </ul>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><span>Welcome </span>{user.username}
            <span className="material-icons white nav_user">
            perm_identity 
            </span>
          </li>
          <li><a onClick={this.logout}> Log out</a></li>
        </ul>
      </span>
    );
    const guestLink = (
      <span>
        <a href="#" data-activates="mobile-demo"
          className="button-collapse"><i className="material-icons">
            menu
       </i>
        </a>
        <ul className="side-nav" id="mobile-demo">
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/signin">Sign in</Link></li>
        </ul>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/signin">Sign in</Link></li>
        </ul>
      </span>
    );
    return (
      <div className="navbar-fixed navbar-main">
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo" style={navLogo}>POST-IT</Link>
            <img src="/img/logo.png" alt="test"/>
            {active ? userLinks : guestLink}
          </div>
        </nav>
      </div>
    );
  }
}
NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

/**
 * 
 * 
 * @param {any} state 
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, { logout })(NavigationBar);
