import React from 'react';

class Home extends React.Component {
    render() {
        return (

            <div className="container">
                <h1 className="cover-heading">PostIt.</h1>
                <p className="lead">
                    A simple application that allows friends and colleagues create groups for collaboration.
                     This way you can post notifications with degree of priority to
                     everyone in your group by sending a message once. Awesome isn't it
                      </p>
                <p className="lead">
                    <a href="" className="waves-effect waves-light btn grey">Get Started</a>
                </p>


                <div className="mastfoot">
                    <p>Post-IT, by <a href="https://github.com/louisdante9/PostIt">@louisdante9</a>.</p>
                    <div className="inner">
                    </div>
                </div>
            </div>


        );
    }
}

export default Home;