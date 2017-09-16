import React from 'react';
import SigninForm from './SiginForm';
import { connect } from 'react-redux';
import { compose } from 'redux';
import requireauth from '../../utils/requireAuth';
import { addFlashMessage } from '../../actions/flashMessages';


class SigninPage extends React.Component {
    render() {
        return (
            <div className="container">
                <h2>Sign In Here</h2>
                <SigninForm />
                <p className="authlink">Don't have an account <a>Sign Up</a> </p>
                <p className="authlink">Forgot password? <a>Click here</a></p>
            </div>
        );
    }
}

export default SigninPage;
