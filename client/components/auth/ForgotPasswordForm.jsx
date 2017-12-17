import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { validateForgotPasswordInput } from '../../../server/shared/validations';
import TextFieldGroup from '../common/TextFieldGroup';
import Footer from '../common/Footer.jsx';
import { resetPassword } from '../../actions/authActions';

/*global Materialize */
/**
 * 
 * 
 * @class ForgotPasswordForm
 * @extends {React.Component}
 */
export class ForgotPasswordForm extends React.Component {

  /**
   * Creates an instance of ForgotPasswordForm.
   * @param {any} props 
   * @memberof ForgotPasswordForm
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
      successMessage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * 
   * @returns {void}
   * @param {any} event 
   * @memberof ForgotPasswordForm
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * 
   * @returns {void}
   * @param {any} event 
   * @memberof ForgotPasswordForm
   */
  onSubmit(event) {
    event.preventDefault();
    const { errors, isValid } = validateForgotPasswordInput(this.state);
    const { email } = this.state;
    if (isValid) {
      this.props.resetPassword({email})
        .then(res => {
          if (res && res.status == '200') {
            Materialize.toast('A password reset link has been sent to your mail, pls check your mail', 3000, 'blue');
          }else{
            Materialize.toast('ops! sorry an error occured while updating your password', 3000, 'red');
          }
        })
        .catch(error => {
          if (error.response) {
            Materialize.toast(error.response.data.err, 3000, 'orange');
          }
        });
    }
  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof ForgotPasswordForm
   */
  render() {
    const message = this.state.successMessage;
    return (
      <div className="container auth-form align">
        <h2>Forgot Your Password?</h2>
        <p>enter your email address below and 
        <br/> to get a new one</p>
        <form className="row" onSubmit={this.onSubmit}>

          <div className="col s12">
            <TextFieldGroup
              error={this.state.errors.email}
              onChange={this.onChange}
              value={this.state.email}
              field="email"
              placeholder="Enter Email"
              required
            />
            <div className="form-cta">
              <button className="btn shadow-effect  black ">
                Send
              </button>
             </div>
           </div>
         </form>
        <Footer />
      </div>
    );
  }
}
export default connect(null, { resetPassword })(ForgotPasswordForm);
