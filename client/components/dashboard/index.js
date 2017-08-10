import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function HOC(Components) {
    class hoc extends Component {

        constructor(props) {
            super(props);
            console.log(props, 'i was called');
        }

        componentWillMount() {
            const { auth } = this.props;
            if(!auth.active && !localStorage.getItem('jwtToken') ) {
                this.context.router.push('/signin') || this.context.router();
            } else {
                this.context.router.push('/dashboard');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.auth) {
                nextProps.router.context.push('/signin');
            } 
        }
        
        render() {
            return (
                <Components / >
            );
        }
    }
    hoc.contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    const mapStateProps = (state, ownProps) => {
        return {
            auth: state.auth
        };
    };
    return connect(mapStateProps, null)(hoc);
}
