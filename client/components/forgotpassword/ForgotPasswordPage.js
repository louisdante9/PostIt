import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';


export class ForgotPasswordPage extends React.Component {
    render() {
        return (
            <div className="container align">
                <h2>Forgot Your Password?</h2>
                <p>enter your email address below and to get a new one</p>
                <ForgotPasswordForm />
            </div>
        );
    }
}

export default ForgotPasswordPage;