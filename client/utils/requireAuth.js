import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';


export default function (ComposedComponent) {
    class Autheticate extends Component {
        componentWillMount(){
            const { location: { pathname }, active } = this.props;
            if (!active && pathname.includes('dashboard')) {
               
                    Materialize.toast('You need to be logged in to access this page', 3000, 'red');   
                
                
                this.context.router.push('/signin');
            }
            else if (active) {
                this.context.router.push('/dashboard');
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
