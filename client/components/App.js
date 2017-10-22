import React, {PropTypes}from 'react';
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';

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
        active: !!localStorage.getItem('jwtToken')
      };
    }

    /**
     * 
     * 
     * @returns {void}
     * @memberof App
     */
    render() {
        return(
            <div>
                <NavigationBar auth={this.props.auth}/>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    };
};


export default connect(mapStateToProps)(App);


