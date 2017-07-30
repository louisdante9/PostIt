import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';

class SignupPage extends React.Component{
    render(){
        const { userSignupRequest } = this.props;
        return(
            <div className="site-wrapper">
                <div className="site-wrapper-inner">
                  <div className="cover-container">
                    <div className="inner cover">
                      <h2>Join Our Community!</h2>
                      <SignupForm userSignupRequest={userSignupRequest} />
                      <p className="authlink">Already have an account <a>Sign In</a> </p>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

SignupPage.propTypes ={
  userSignupRequest: React.PropTypes.func.isRequired
};
export default connect(null, 
{ userSignupRequest })(SignupPage);