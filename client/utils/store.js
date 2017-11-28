import React from 'react';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
const Logger = createLogger()
export const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(Logger, thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);