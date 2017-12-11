import React from 'react';
import Footer from '../common/Footer.jsx';

/* * 
 * 
 * @param {any} props 
 * @returns { void }
 */
export const Home = (props) => {
  return (
    <div className="home-background-image">
      <div className="home-container container align">
        <div className="signincontainer">
          <h1 className="cover-heading">PostIt.</h1>
          <p className="intro-word">
            A simple application that allows friends and colleagues
            create groups for collaboration.
            This way you can post notifications with
            degree of priority to everyone in your group
            by sending a message once. Awesome isn't it
          </p>
          <p className="">
            <a href="/signup"
              className=" btn shadow-effect home-btn">
              Get Started
            </a>
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};