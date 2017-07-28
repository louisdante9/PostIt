import React, {PropTypes}from 'react';
import NavigationBar from './NavigationBar';

class App extends React.Component{
    render(){
        return(
            <div>
                <NavigationBar />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes ={
    children : PropTypes.object.isRequired
};
export default App;