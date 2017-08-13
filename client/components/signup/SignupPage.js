import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/authActions';
import { addFlashMessage } from '../../actions/flashMessages';



class SignupPage extends React.Component{
    render(){
        const { userSignupRequest, addFlashMessage } = this.props;
        return(
            <div className="site-wrapper">
                <div className="site-wrapper-inner">
                  <div className="cover-container">
                    <div className="inner cover">
                      <h2>Join Our Community!</h2>
                      <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={ addFlashMessage} />
                      <p className="authlink">Already have an account <a href="#">Sign In</a> </p>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

SignupPage.propTypes ={
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};
const mapDispatchToProps = { userSignupRequest, addFlashMessage };
export default connect(null, mapDispatchToProps)(SignupPage);