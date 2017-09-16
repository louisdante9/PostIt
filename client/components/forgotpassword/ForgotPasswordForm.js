import React from 'react';
import { browserHistory } from 'react-router';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class ForgotPasswordForm extends React.Component{
   constructor(props){
    super(props);
    this.state = {
      email: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  // onSubmit(e){
  //   e.preventDefault();
  //   const {errors, isValid} = validateInput(this.state);
  //   if (isValid) {
  //     this.setState({ isLoading: true });
  //     this.props.userSignupRequest(this.state).then(
  //       (result) =>{
  //         this.props.addFlashMessage({
  //           type: 'success',
  //           text: 'You signed up successfull. Welcome!'
  //         });
  //         browserHistory.push('/dashboard');
  //       }
       
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       const error =  err.response.errors;
  //       this.handleErrors(error);
  //       this.setState({ isLoading: false });
  //   });
  //   }
  //   else {
  //     this.handleErrors(errors);
  // }
  // }
  // handleErrors(errors) {
  //   Object.keys(errors).forEach((error) => {
  //       Materialize.toast(errors[error], 3000);
  //   });
  // }
    render(){
      return(
            <form className="col s12" onSubmit={this.onSubmit}>
             
              <div className="row">
                <TextFieldGroup
                  error={this.state.errors.email}
                  onChange={this.onChange}
                  value={this.state.email}
                  field ="email"
                  placeholder="Enter Email"
                 />
              </div>
             
             
              <button  className="btn waves-effect waves-light">Send Password</button>  
          </form>
       );
   }  
}

ForgotPasswordForm.propTypes ={
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

export default ForgotPasswordForm;