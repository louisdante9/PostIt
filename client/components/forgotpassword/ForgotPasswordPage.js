import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
// import { connect } from 'react-redux';
// import { userSignupRequest } from '../../actions/authActions';
// import { addFlashMessage } from '../../actions/flashMessages';



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