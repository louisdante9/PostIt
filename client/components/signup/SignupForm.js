import React from 'react';
import { browserHistory } from 'react-router';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends React.Component{
   constructor(props){
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
  
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e){
    e.preventDefault();
    const {errors, isValid} = validateInput(this.state);
    if (isValid) {
      this.setState({ isLoading: true });
      this.props.userSignupRequest(this.state).then(
        (result) =>{
          Materialize.toast('You signed up successfull. Welcome!', 3000, 'green');          
          browserHistory.push('/dashboard');
        })
      .catch((err) => {
        const error =  err.response.data.message;
        this.handleErrors(error);
        this.setState({ isLoading: false });
    });
    }
    else {
      this.handleErrors(errors);
  }
  }
  handleErrors(errors) {
    if(typeof errors !== "string"){
        Object.keys(errors).forEach((error) => {
                Materialize.toast(errors[error], 3000, 'red');
            });
    }else{
      Materialize.toast(errors, 3000, 'red');      
    }
    
  }
    render(){
      return(
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row">
                <TextFieldGroup
                  error={this.state.errors.username}
                  onChange={this.onChange}
                  value={this.state.username}
                  field ="username"
                  placeholder="Enter Username"
                 />
              </div>
              <div className="row">
                <TextFieldGroup
                  error={this.state.errors.email}
                  onChange={this.onChange}
                  value={this.state.email}
                  field ="email"
                  placeholder="Enter Email"
                 />
              </div>
              <div className="row">
                <TextFieldGroup
                  error={this.state.errors.password}
                  onChange={this.onChange}
                  value={this.state.password}
                  type="password"
                  field ="password"
                  placeholder="Enter Password"
                 />
              </div>
              <div className="row">
              <TextFieldGroup
                error={this.state.errors.phone}
                onChange={this.onChange}
                value={this.state.phone}
                type="text"
                field ="phone"
                placeholder="Enter Phone number"
               />
            </div>
              <button  className="btn waves-effect waves-light black card-1">Sign Up</button>  
          </form>
       );
   }  
}

SignupForm.propTypes ={
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

export default SignupForm;