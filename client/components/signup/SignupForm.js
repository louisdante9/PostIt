import React from 'react';
import validateInput from '../../../server/shared/validations/signup';

class SignupForm extends React.Component{
   constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '', 
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
  isValid(){
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  onSubmit(e){
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () =>{},
        ({ data }) => this.setState({ errors: data, isLoading: false })
      );
    }
  }
    render(){
      const { errors } = this.state;
      return(
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.username} onChange={this.onChange} type="text" 
                  name="username"  placeholder="Enter Username"/>
                  {errors.username && <span className="badge">{errors.username}</span>}
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input type="email" onChange={this.onChange} name="email" 
                   placeholder="Enter Email"/>
                   {errors.email && <span className="badge">{errors.email}</span>}
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="password" onChange={this.onChange} name="password" 
                  type="password"  placeholder="Enter Password"/>
                  {errors.password && <span className="badge">{errors.password}</span>}
                </div>
              </div>
              <button  className="btn waves-effect waves-light">Sign Up</button>  
          </form>
       );
   }  
}

SignupForm.propTypes ={
  userSignupRequest: React.PropTypes.func.isRequired
};

export default SignupForm;