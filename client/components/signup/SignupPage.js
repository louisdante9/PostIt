import React from 'react';

class Home extends React.Component{
    render(){
        return(
            <div className="site-wrapper">
                <div className="site-wrapper-inner">
                  <div className="cover-container">
                    <div className="inner cover">
                      <h2>Sign Up Here</h2>
                       <form className="col s12">
                          <div className="row">
                            <div className="input-field col s12">
                              <input id="first_name" type="text" className="validate"/>
                              <label htmlFor="first_name">Username</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <input id="email" type="email" className="validate"/>
                              <label htmlFor="email">Email</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <input id="password" type="password" className="validate"/>
                              <label htmlFor="password">Password</label>
                            </div>
                          </div>
                          <button className="btn waves-effect waves-light" type="submit" name="action">Sign Up</button>  
                        </form>
                        <p className="authlink">Already have an account <a>Sign In</a> </p>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Home;