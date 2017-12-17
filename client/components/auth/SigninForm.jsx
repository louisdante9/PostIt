import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import requireauth from '../../utils/requireAuth';
import { login } from '../../actions/authActions';
import { validateSigninFormInput } from '../../validations';
import TextFieldGroup from '../common/TextFieldGroup';
import Footer from '../common/Footer.jsx';
/* global Materialize */

/**
 * 
 * This is class method that handles signin logic
 * @export
 * @class SigninForm
 * @extends {React.Component}
 */
export class SigninForm extends React.Component {
  /**
   * Creates an instance of signin form
   * @param {any} props -
   * @memberof signinform 
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * This method validates the input from the state object 
   * and chcecks if its valid and makes an api call to the backend
   * 
   * @param {any} event 
   * @memberof SigninForm
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const { errors, isValid } = validateSigninFormInput(this.state);
    if (isValid) {
      this.setState({ isLoading: true });
      this.props.login(this.state)
        .then(() => {
          Materialize.toast('Welcome!', 3000, 'green');
          this.context.router.push('/dashboard');
        })
        .catch((err) => {
          const error = err.response.data.errors;
          this.handleErrors(error);
          this.setState({ isLoading: false });
        });
    } else {
      this.handleErrors(errors);
    }
  }


  /**
   *  this method is gets the values of the input
   * and passes the values to the global state object
   * @param {any} event 
   * @memberof SigninForm
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * this method handle errors that return as an object
   * 
   * @param {any} errors 
   * @memberof SigninForm
   * @returns {void}
   */
  handleErrors(errors) {
    Object.keys(errors).forEach((error) => {
      Materialize.toast(errors[error], 3000, 'red');
    });
  }
  /**
   * 
   * @returns  {void}
   * @memberof SigninForm
   */
  render() {
    const { email, password, errors, isLoading } = this.state;
    return (
      <div className="container auth-form align">
        <h2>Sign In Here</h2>
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
                type="submit" name="action">Sign In
              </button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col s12">
            <p className="authlinks">
              Don't have an account &nbsp;<a href="/signup">Sign Up</a><br />
              <a href="/forgotpassword">Forgot password?</a>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

SigninForm.propTypes = {
  login: PropTypes.func.isRequired
};
SigninForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { login })(SigninForm);