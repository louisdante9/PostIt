import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import validateInput from '../../../server/shared/validations/forgotpass';
import TextFieldGroup from '../common/TextFieldGroup';

class ForgotPasswordForm extends React.Component {
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

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = validateInput(this.state);

    const { email } = this.state;

    console.log(email, 'this is the mail');

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
          Materialize.toast('password updated, pls check your mail', 3000,'blue');

        }
      
        else {
          Materialize.toast('error updating your password', 3000,'red');
        }
      })
      
      .catch(error => {
        
        if (error.response) {
         
          Materialize.toast(error.response.data.err, 3000, 'orange');
         
        } 

      });
    }
   
  }
  
  render() {
    const message = this.state.successMessage;
    // if (!message === '') {
    //   Materialize.toast(message, 3000);
    // }
    return (
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
        <button className="btn waves-effect waves-light">Send Password</button>
      </form>
    );
  }
}


export default ForgotPasswordForm;