import React from 'react';
import validateInput from '../../../server/shared/validations/signin';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { compose } from 'redux';
import requireauth from '../../utils/requireAuth';
import { login } from '../../actions/authActions';
import Footer from '../common/footer.jsx';

export class SigninForm extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            errors: {}, 
            isLoading: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

      onSubmit(event){
        event.preventDefault();
        const { errors, isValid } = validateInput(this.state);
        if (isValid) {
            this.setState({ isLoading: true});
            this.props.login(this.state)
            .then((res) =>{ 
                Materialize.toast('Welcome!', 3000, 'green');   
                this.context.router.push('/dashboard')})
            .catch((err) => {
                console.log(err);
                const error =  err.response.data.errors;
                this.handleErrors(error);
                this.setState({ isLoading: false });
            });
        } else {
            this.handleErrors(errors);
        }
      }
      handleErrors(errors) {
        Object.keys(errors).forEach((error) => {
            Materialize.toast(errors[error], 3000);
        });
      }

      onChange(event){
          this.setState({ [event.target.name]: event.target.value});
      }
    render(){
        const { email, password , errors, isLoading } = this.state;
        return(
            <div className="container align">
            <div className="signincontainer">
             <h2>Sign In Here</h2>
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
                    <button className="btn waves-effect waves-light black card-1" type="submit" name="action">Sign In</button>  
                </form>
                <p className="authlink">Don't have an account <a href="/signup">Sign Up</a> </p>
                <p className="authlink"><a href="/forgotpassword">Forgot password?</a></p>
               </div>
              { /**<div className="mastfoot black">
               <p className="">Post-IT, by <a href="https://github.com/louisdante9/PostIt">@louisdante9</a>.</p>
               <div className="inner">
               </div>
        </div>*/}
        <Footer />
               </div>
        );
    }
}

SigninForm.propTypes = {
    login: React.PropTypes.func.isRequired 
};
SigninForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(null, { login })(SigninForm);