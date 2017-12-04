import React from 'react';
import NavigationBar from '../components/common/NavigationBar.jsx';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';


/**
 * 
 * 
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {

  /**
   * Creates an instance of App.
   * @param {any} props 
   * @memberof App
   */
  constructor(props) {
    super(props);
    this.state = {
      active: !localStorage.getItem('jwtToken')
    };
  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof App
   */
  render() {
    const divStyle = {
      backgroundSize: '100%',
      height: '100%',
      overflow: 'inherit'
    };
    return (
      <div style={divStyle}>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};


export default connect(mapStateToProps)(App);


