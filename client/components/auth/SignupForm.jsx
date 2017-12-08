import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import Footer from '../common/Footer.jsx';
import { userSignupRequest } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/signup';

/*global Materialize */
/**
 * 
 * 
 * @class SignupForm
 * @extends {React.Component}
 */
export class SignupForm extends React.Component {
  /**
   * Creates an instance of SignupForm.
   * @param {any} props 
   * @memberof SignupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      phone: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * 
   * @returns {void} 
   * @param {any} event
   * @memberof SignupForm
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
   * @memberof SignupForm
   */
  onSubmit(event) {
    event.preventDefault();
    const { errors, isValid } = validateInput(this.state);
    if (isValid) {
      this.setState({ isLoading: true });
      this.props.userSignupRequest(this.state).then(
        (result) => {
          Materialize
          .toast('You signed up successfull. Welcome!', 3000, 'green');
          browserHistory.push('/dashboard');
        })
        .catch((err) => {
          const error = err.response.data.message;
          this.handleErrors(error);
          this.setState({ isLoading: false });
        });
    }
    else {
      this.handleErrors(errors);
    }
  }

  /**
   * 
   * @returns {void}
   * @param {any} errors 
   * @memberof SignupForm
   */
  handleErrors(errors) {
    if (typeof errors !== "string") {
      Object.keys(errors).forEach((error) => {
        Materialize.toast(errors[error], 3000, 'red');
      });
    } else {
      Materialize.toast(errors, 3000, 'red');
    }
  }
  
  /**
   * 
   * 
   * @returns {void}
   * @memberof SignupForm
   */
  render() {
    return (
      <div className="container auth-form align">
        <h2>Join Our Community!</h2>
        <form className="row" onSubmit={this.onSubmit}>
          <div className="col s12">
            <TextFieldGroup
              error={this.state.errors.username}
              onChange={this.onChange}
              value={this.state.username}
              field="username"
              placeholder="Enter Username"
              required
            />
            <TextFieldGroup
              error={this.state.errors.email}
              onChange={this.onChange}
              value={this.state.email}
              field="email"
              placeholder="Enter Email"
              required
            />
            <TextFieldGroup
            error={this.state.errors.phone}
            onChange={this.onChange}
            value={this.state.phone}
            type="text"
            field="phone"
            placeholder="Enter Phone number"
            required
            />
            <TextFieldGroup
              error={this.state.errors.password}
              onChange={this.onChange}
              value={this.state.password}
              type="password"
              field="password"
              placeholder="Enter Password"
              required
            />
            <div className="form-cta">
              <button className="btn waves-effect waves-light black shadow-effect" 
              type="submit" name="action">Sign Up</button>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col s12">
            <p className="authlinks">
              Already have an account &nbsp;<a href="/signin">Sign In</a><br/>
            </p>
          </div>
        </div>

        <Footer />
        
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};
const mapDispatchToProps = { userSignupRequest };
export default connect(null, mapDispatchToProps)(SignupForm);
