import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import routes from './routes';
import './public/css/styles.scss';
import setAuthToken from './utils/setAuthToken';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/authActions';


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
        console.log(jwt.decode(localStorage.jwtToken));
        store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
        // console.log(decodedToken);
    } else {
        localStorage.removeItem('jwtToken');
    }
}

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('app'));