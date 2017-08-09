import React from 'react';
import SigninForm from './SiginForm';

class SigninPage extends React.Component{
    render(){
        return(
            <div className="site-wrapper">
                <div className="site-wrapper-inner">
                  <div className="cover-container">
                    <div className="inner cover">
                      <h2>Sign In Here</h2>
                       <SigninForm />
                        <p className="authlink">Already have an account <a>Sign In</a> </p>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default SigninPage;