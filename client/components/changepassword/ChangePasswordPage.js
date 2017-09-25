import React from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import { compose } from 'redux';


class ChangePasswordPage extends React.Component {
    render() {
        console.log(this.props.params.token);        
        return (
            <div className="container">
                <h2>Reset Password</h2>
                <p></p>
                <ChangePasswordForm token={this.props.params.token} />
                
            </div>
        );
    }
}

export default ChangePasswordPage;
