import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import routes  from './routes';
import './public/css/styles.css';
// import 'materialize-css/dist/css/materialize.min.css';
// import 'jquery';
// import 'materialize-css/dist/js/materialize.min.js';


const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
    
);


render(
    <Provider store={store}>
        <Router history={browserHistory}  routes={routes}/>
    </Provider>, document.getElementById('app'));