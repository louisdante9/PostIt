import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/authActions';
import { addFlashMessage } from '../../actions/flashMessages';



class SignupPage extends React.Component {
  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div className="container align">
        <h2>Join Our Community!</h2>
        <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
        <p className="authlink">Already have an account <a href="/signin">Sign In</a> </p>
        <div className="mastfoot black">
          <p className="">Post-IT, by <a href="https://github.com/louisdante9/PostIt">@louisdante9</a>.</p>
          <div className="inner">
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};
const mapDispatchToProps = { userSignupRequest, addFlashMessage };
export default connect(null, mapDispatchToProps)(SignupPage);