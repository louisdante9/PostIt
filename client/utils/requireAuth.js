import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * 
 * 
 * @export
 * @param {any} ComposedComponent 
 * @returns {void}
 */
export default function (ComposedComponent) {

    /**
     * 
     * 
     * @class Autheticate
     * @extends {Component}
     */
    class Autheticate extends Component {

        /**
         * 
         * @returns {void}
         * @memberof Autheticate
         */
        componentWillMount(){
            const { location: { pathname }, active } = this.props;
            if (!active && pathname.includes('dashboard')) {
                Materialize
                  .toast('You need to be logged in to access this page', 3000, 'red');   
                this.context.router.push('/signin');
            }
            else if (active) {
                this.context.router.push('/dashboard');
            }
        }
        
        /**
         * 
         * @return {void}
         * @param {any} nextProps 
         * @memberof Autheticate
         */
        componentWillUpdate(nextProps){
           if(!nextProps.active){
              this.context.router.push('/');
           }
        }

        /**
         * 
         * 
         * @returns {void}
         * @memberof Autheticate
         */
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
    };
    
    /**
     * 
     * 
     * @param {any} state 
     * @returns {void}
     */
    function mapStateToProps (state){
        return {
            active: state.auth.active
        };
    }
    return connect(mapStateToProps)(Autheticate);
}
