import React from 'react';
import { Link, browserHistory, Redirect } from 'react-router';
import { connect } from 'react-redux';
import  { logout } from '../actions/authActions';
class NavigationBar extends React.Component{

    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
    }
    // componentWillMount(nextProps) {
    //   console.log('props was received');
    //   if(localStorage.getItem('jwtToken')) {
    //       this.props.authenticate();
    //   }
    // }
    
    logout(e) {
     e.preventDefault();
     this.props.logout();
    }


  render() {
    const{ active } = this.props.auth;
    const userLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="" onClick={this.logout}>Log out</a></li>
      </ul>
    );
    const guestLink = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="#">Download App</a></li>
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/signin">Sign in</Link></li>
      </ul>
    );
    return(
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <Link to="/" class="brand-logo logo">POST-IT</Link>
            <img alt=""/>
              {active ? userLinks : guestLink}
          </div>
        </nav>
       </div>
    );
  }
}
// NavigationBar.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };
NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, { logout })(NavigationBar);
