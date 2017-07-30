import React from 'react';


class SignupForm extends React.Component{
   constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword:''
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
    this.props.userSignupRequest(this.state);
  }
    render(){
      return(
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.username} onChange={this.onChange} type="text" 
                  name="username" className="validate" placeholder="Enter Username"/>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input type="email" onChange={this.onChange} name="email" 
                  className="validate" placeholder="Enter Email"/>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="password" onChange={this.onChange} name="password" 
                  type="password" className="validate" placeholder="Enter Password"/>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="password" onChange={this.onChange} name="confirmPassword" 
                  type="password" className="validate" placeholder="Confirm Password"/>
                </div>
              </div>
              <button className="btn waves-effect waves-light">Sign Up</button>  
          </form>
       );
   }  
}

SignupForm.propTypes ={
  userSignupRequest: React.PropTypes.func.isRequired
};

export default SignupForm;