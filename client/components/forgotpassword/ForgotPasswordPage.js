import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';


export class ForgotPasswordPage extends React.Component {
    render() {
        return (
            <div className="container align">
               <div className="signincontainer">
               <h2>Forgot Your Password?</h2>
               <p>enter your email address below and to get a new one</p>
               <ForgotPasswordForm />
               </div>
                <div className="mastfoot black">
                <p className="">Post-IT, by <a href="https://github.com/louisdante9/PostIt">@louisdante9</a>.</p>
                <div className="inner">
                </div>
            </div>
            </div>
        );
    }
}

export default ForgotPasswordPage;