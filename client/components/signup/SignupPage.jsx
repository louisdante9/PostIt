import React from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm.jsx';
import { userSignupRequest } from '../../actions/authActions';
import { addFlashMessage } from '../../actions/flashMessages';
import Footer from '../common/footer.jsx';



/**
 * 
 * 
 * @class SignupPage
 * @extends {React.Component}
 */
class SignupPage extends React.Component {
  /**
   * 
   * 
   * @returns 
   * @memberof SignupPage
   * returns {void}
   */
  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div className="container align">
        <h2>Join Our Community!</h2>
        <SignupForm userSignupRequest={userSignupRequest}
          addFlashMessage={addFlashMessage} />
        <p className="authlink">
          Already have an account
        <a href="/signin">Sign In</a>
        </p>
        <Footer />
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