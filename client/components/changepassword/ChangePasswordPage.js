import React from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import { compose } from 'redux';


class ChangePasswordPage extends React.Component {
    render() {
        return (
            <div className="container align">
                <h2>Change Password</h2>
                <p></p>
                <ChangePasswordForm token={this.props.params.token} />
                
            </div>
        );
    }
}

export default ChangePasswordPage;
