import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import { PropTypes } from 'prop-types';
import { confirmPasswordResetRequest } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/changepassword';
import Footer from '../common/footer.jsx';

/**
 * 
 * 
 * @class ChangePasswordForm
 * @extends {React.Component}
 */
class ChangePasswordForm extends React.Component {

  /**
   * Creates an instance of ChangePasswordForm.
   * @param {any} props 
   * @memberof ChangePasswordForm
   */
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * 
   * @returns {void}
   * @param {any} event 
   * @memberof ChangePasswordForm
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
   * @memberof ChangePasswordForm
   */
  onSubmit(event) {
    event.preventDefault();
    const token = this.props.params.token;
    this.props.confirmPasswordResetRequest(token, this.state);
  }

  /**
   * 
   * 
   * @returns {void}
   * @memberof ChangePasswordForm
   */
  render() {
    const { errors, newPassword, confirmPassword } = this.state;
    return (
      <div className="container auth-form align">
        <h2>Change Password</h2>
        <p></p>
        <form className="row" onSubmit={this.onSubmit}>
          <div className="col s12">
            <TextFieldGroup
              onChange={this.onChange}
              value={this.state.newPassword}
              type="password"
              field="newPassword"
              placeholder="Enter New Password"
            />
            <TextFieldGroup
              onChange={this.onChange}
              value={this.state.confirmPassword}
              type="password"
              field="confirmPassword"
              placeholder="Confirm Password"
            />
            <div className="form-cta">
              <button className="btn shadow-effect black card-1">
                Update password
           </button>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}
ChangePasswordForm.propTypes = {
  confirmPasswordResetRequest: PropTypes.func.isRequired,
  params: PropTypes.object,
};
export default connect(null, 
  { confirmPasswordResetRequest })(ChangePasswordForm);