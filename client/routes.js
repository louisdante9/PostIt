import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import SignupPage from './components/signup/SignupPage';
import SigninPage from './components/signin/SigninPage';
import Dashboard from './components/groupevents/Dashboard';
import requireAuth from './utils/requireAuth';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="signup" component={requireAuth(SignupPage)}/>
        <Route path="signin" component={requireAuth(SigninPage)}/>
        <Route path="dashboard" component={requireAuth(Dashboard)}/>
        
    </Route>
    
);