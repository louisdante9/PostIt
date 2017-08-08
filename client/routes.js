import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import SignupPage from './components/signup/SignupPage';
import SigninPage from './components/signin/SigninPage';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="signup" component={SignupPage}/>
        <Route path="signin" component={SigninPage}/>
    </Route>
    
);