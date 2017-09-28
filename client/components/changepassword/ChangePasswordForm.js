import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { confirmPasswordResetRequest } from '../../actions/authActions';
import validateInput from '../../../server/shared/validations/changepassword';
import TextFieldGroup from '../common/TextFieldGroup';

class ChangePasswordForm extends React.Component{
   constructor(props){
    super(props);
    this.state = {
      newPassword: '', 
      confirmPassword : '',
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const token = this.props.token;
      this.props.confirmPasswordResetRequest(token, this.state);
  }
    render(){
      
       const { errors, newPassword, confirmPassword } = this.state;
      return(
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row">
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.newPassword}
                type="password"
                field ="newPassword"
                placeholder="Enter New Password"
               />
            </div>
            <div className="row">
            <TextFieldGroup
              onChange={this.onChange}
              value={this.state.confirmPassword}
              type="password"
              field ="confirmPassword"
              placeholder="Confirm Password"
             />
          </div>
              <button  className="btn waves-effect waves-light black card-1">Update password</button> 
              <p> </p>
          </form>
       );
   }  
}
ChangePasswordForm.propTypes = {
  confirmPasswordResetRequest: React.PropTypes.func.isRequired
};
export default connect(null, {confirmPasswordResetRequest})(ChangePasswordForm);