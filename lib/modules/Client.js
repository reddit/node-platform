import { Thunker, PromiseWell, Logger } from '@r/middleware';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import navigationMiddleware from './navigationMiddleware';
import platform from './reducer';

export default config => {
  const {
    container='container',
    dataVar='___r',
    modifyData=data => data,
    appComponent=<div/>,
    reducers={},
    reduxMiddleware=[],
    routes=[],
    debug=false,
    onHandlerComplete=() => {},
  } = config;

  const well = PromiseWell.create();
  const thunk = Thunker.create();
  const nav = navigationMiddleware.create(routes, false, onHandlerComplete);

  const reds = combineReducers({ ...reducers, platform });
  const wares = reduxMiddleware.concat([nav, thunk, well.middleware]);

  if (debug && !window.devToolsExtension) {
    wares.push(Logger);
  }

  return () => {
    const $container = document.getElementById(container);

    let data;
    try {
      const temp = window[dataVar];
      data = modifyData(temp);
    } catch (e) {
      data = {};
    }

    const store = createStore(reds, data, compose(
      applyMiddleware(...wares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    ReactDOM.render(
      <Provider store={ store }>
        { appComponent }
      </Provider>
      ,$container
    );

    return store;
  };
};
