import 'babel-polyfill';
import React from 'react';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import rootReducer from './rootReducer';
import routes from './routes';
import setAuthToken from './utils/setAuthToken';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { store } from './utils/store';
import { setCurrentUser } from './actions/authActions';
import './scss/styles.scss';
import './scss/main.scss';

const { localStorage } = window;
const jwtToken = localStorage && localStorage.getItem('jwtToken');
if (jwtToken) {
  const decodedToken = jwt.decode(jwtToken);
  const hasExpired = decodedToken.exp - (Date.now() / 1000) < 0;
  if (!hasExpired) {
    setAuthToken(jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(jwtToken)));
  } else {
    localStorage.removeItem('jwtToken');
  }
}
render(
  <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>, 
    document.getElementById('app')
);