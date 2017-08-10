import React from 'react';
import { Link, browserHistory, Redirect } from 'react-router';
import { connect } from 'react-redux';
import  { logout, authenticate } from '../actions/authActions';
class NavigationBar extends React.Component{

    // constructor(props) {
    //   super(props);
    //   console.log('i recieved');
    // }
    // componentWillMount(nextProps) {
    //   console.log('props was received');
    //   if(localStorage.getItem('jwtToken')) {
    //       this.props.authenticate();
    //   }
    // }
    
    // logout() {
    //   this.props.logout();
    //   browserHistory.push('/');
    // }

    renderNav() {
      return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        <div>
                <li><a href="#">Download App</a></li>
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/signin">Sign in</Link></li>
              </div>  
          {
          //     !this.props.auth.active && !localStorage.getItem('jwtToken')? 
              
              //: <li onClick={this.logout.bind(this)}><a>Logout </a></li>
          }
        </ul>
      );
    }


  render() {
    return(
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <Link to="/" class="brand-logo logo">POST-IT</Link>
            <img alt=""/>
            {this.renderNav()}
          </div>
        </nav>
       </div>
    );
  }
}
NavigationBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};
NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
// export default connect(mapStateToProps, { logout, authenticate })(NavigationBar);
export default NavigationBar;