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
import { setCurrentUser } from './actions/authActions';
import './public/css/styles.scss';

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
if (localStorage.jwtToken) {
    const decodedToken = jwt.decode(localStorage.jwtToken);
    const hasExpired = decodedToken.exp - (Date.now() / 1000) < 0;
    if (!hasExpired) {
        setAuthToken(localStorage.jwtToken);
        store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
    } else {
        localStorage.removeItem('jwtToken');
    }
}
render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('app'));