import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import SignupPage from './components/signup/SignupPage.jsx';
import SigninPage from './components/signin/SigninForm';
import ForgotPassword from './components/forgotpassword/ForgotPasswordPage';
import ChangePassword from './components/changepassword/ChangePasswordPage';
import Dashboard from './components/groupevents/Dashboard';
import NotFound from './components/notfound/NotFound';
import requireAuth from './utils/requireAuth';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={requireAuth(HomePage)}/>
        <Route path="signup" component={requireAuth(SignupPage)}/>
        <Route path="signin" component={requireAuth(SigninPage)}/>
        <Route path="dashboard" component={requireAuth(Dashboard)}/>
        <Route path="forgotpassword" component={requireAuth(ForgotPassword)}/>
        <Route path="resetpassword/:token"  component={requireAuth(ChangePassword)}/>
        <Route path="*" component={NotFound} />
    </Route>  
);