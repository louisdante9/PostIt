import React, {PropTypes}from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import { connect } from 'react-redux';

class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        active: !!localStorage.getItem('jwtToken')
      };
    }

    render() {
        return(
            <div>
                <NavigationBar auth={this.props.auth}/>
                <FlashMessagesList />
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


