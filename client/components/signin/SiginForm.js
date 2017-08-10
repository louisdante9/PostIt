import React from 'react';
import validateInput from '../../../server/shared/validations/signin';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import Hoc from '../dashboard';
class SigninForm extends React.Component {
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

      onSubmit(e){
        e.preventDefault();
        const { errors, isValid } = validateInput(this.state);
        if (isValid) {
            this.setState({ isLoading: true});
            this.props.login(this.state)
            .then((res) => this.context.router.push('/dashboard'))
            .catch((err) => {
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

      onChange(e){
          this.setState({ [e.target.name]: e.target.value});
      }
    render(){
        const { email, password , errors, isLoading } = this.state;
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
                    <button className="btn waves-effect waves-light" type="submit" name="action">Sign In</button>  
                </form>
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