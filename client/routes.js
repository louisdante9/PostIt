import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import { Home } from './components/auth/Home.jsx';
import SignupPage from './components/auth/SignupForm.jsx';
import SigninPage from './components/auth/SigninForm.jsx';
import {ForgotPasswordForm} from './components/auth/ForgotPasswordForm.jsx';
import ChangePassword from './components/auth/ChangePasswordForm.jsx';
import Dashboard from './components/groupevents/Dashboard.jsx';
import { NotFound } from './components/auth/NotFound.jsx';
import requireAuth from './utils/requireAuth';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={requireAuth(Home)}/>
        <Route path="signup" component={requireAuth(SignupPage)}/>
        <Route path="signin" component={requireAuth(SigninPage)}/>
        <Route path="dashboard" component={requireAuth(Dashboard)}/>
        <Route 
          path="forgotpassword" 
          component={requireAuth(ForgotPasswordForm)}
        />
        <Route 
          path="resetpassword/:token"  
          component={requireAuth(ChangePassword)}
        />
        <Route path="*" component={NotFound} />
    </Route>  
);