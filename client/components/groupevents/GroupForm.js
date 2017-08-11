import React from 'react';
import validateInput from '../../../server/shared/validations/signin';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';

class SigninForm extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            name: '',
            description: '',
            errors: {}, 
            isLoading: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

      onSubmit(e){
        e.preventDefault();
        
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
        const { title, description , errors, isLoading } = this.state;
        return(
                <form className="col s12" onSubmit={this.onSubmit}>
                    <div className="row">
                        <TextFieldGroup
                        error={errors.name}
                        onChange={this.onChange}
                        value={name}
                        field ="name"
                        placeholder="Enter name of group"
                        />
                    </div>
                    <div className="row">
                        <TextFieldGroup
                        error={errors.description}
                        onChange={this.onChange}
                        value={description}
                        field ="description"
                        placeholder="Enter a brief description here"
                        />
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Create group</button>  
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

export default connect(null)(SigninForm);