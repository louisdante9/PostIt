import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';


export default function (ComposedComponent) {
    class Autheticate extends Component {
        componentWillMount(){
            if (!this.props.active) {
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'You need to be logged in to access this page'
                });

                // not in function scope 
                this.context.router.push('/signin');
            }
        }
        
        componentWillUpdate(nextProps){
           if(!nextProps.active){
              this.context.router.push('/');

           }
        }
        render(){
            return(
                <ComposedComponent {...this.props}/>
            );
        }
        
    }

    Autheticate.contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    Autheticate.propTypes = {
        active : React.PropTypes.bool.isRequired,
        addFlashMessage: React.PropTypes.func.isRequired
    };
    
    function mapStateToProps (state){
        return {
            active: state.auth.active
        };
    }
    return connect(mapStateToProps, { addFlashMessage })(Autheticate);
}
