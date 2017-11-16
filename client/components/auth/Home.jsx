import React from 'react';
import Footer from '../common/footer.jsx';

/* * 
 * 
 * @param {any} props 
 * @returns 
 */
export const Home = (props) => {
    return (
        <div className="container align">
            <div className="signincontainer">
                <h1 className="cover-heading">PostIt.</h1>
                <p className="lead">
                    A simple application that allows friends and colleagues
                        create groups for collaboration.
                        This way you can post notifications with
                        degree of priority to everyone in your group
                        by sending a message once. Awesome isn't it
                    </p>
                <p className="lead">
                    <a href="/signup"
                        className="waves-effect waves-light btn black card-1">
                        Get Started
                    </a>
                </p>
            </div>
            <Footer />
        </div>
    );
};