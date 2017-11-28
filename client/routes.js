import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import { Home } from './components/auth/Home.jsx';
import SignupPage from './components/auth/SignupForm.jsx';
import SigninPage from './components/auth/SigninForm.jsx';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm.jsx';
import ChangePassword from './components/auth/ChangePasswordForm.jsx';
import Dashboard from './components/groupevents/Dashboard.jsx';
import { NotFound } from './components/auth/NotFound.jsx';
import requireAuth from './utils/requireAuth';
import NavigationBar from './components/NavigationBar.jsx';
import BaseNavbarPage from './components/auth/BaseNavbarPage.jsx';



export default(
    <Route component={App}>
        <Route path="/dashboard" component={requireAuth(Dashboard)}/>
        <Route component={requireAuth(BaseNavbarPage)} >
          <Route path="/" component={Home} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/signin" component={SigninPage} />
          <Route path="/forgotpassword" component={ForgotPasswordForm} />
          <Route path="/resetpassword/:token" component={ChangePassword} />
        </Route>
        <Route path="*" component={NotFound} />
    </Route>  
);
