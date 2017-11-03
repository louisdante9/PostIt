import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import validateInput from '../../../server/shared/validations/forgotpass';
import TextFieldGroup from '../common/TextFieldGroup';
import Footer from '../common/footer.jsx';

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
    const { errors, isValid } = validateInput(this.state);
    const { email } = this.state;
    if (isValid) {
      axios({
        method: 'POST',
        url: '/api/user/reqpass',
        data: {
          email: email
        }
      })
        .then(res => {
          if (res && res.status == '200') {
            Materialize.toast('password updated, pls check your mail', 3000, 'blue');
          }

          Materialize.toast('error updating your password', 3000, 'red');
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
      <div className="container align">
        <div className="signincontainer">
          <h2>Forgot Your Password?</h2>
          <p>enter your email address below and to get a new one</p>
          <form className="col s12 " onSubmit={this.onSubmit}>

            <div className="row">
              <TextFieldGroup
                error={this.state.errors.email}
                onChange={this.onChange}
                value={this.state.email}
                field="email"
                placeholder="Enter Email"
              />
            </div>
            <button className="btn waves-effect waves-light black card-1">
              Send
        </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}
