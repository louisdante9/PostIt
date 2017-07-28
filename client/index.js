import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes  from './routes';
import './public/css/styles.css';
import 'materialize-css/dist/css/materialize.min.css';



render(<Router history={browserHistory}  routes={routes} />,
    document.getElementById('app'));