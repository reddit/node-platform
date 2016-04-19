import { Thunker, PromiseWell, Logger } from '@r/middleware';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import navigationMiddleware from './navigationMiddleware';
import platform from './reducer';
import actions from './actions';

export default config => {
  const {
    container='container',
    dataEl='data',
    modifyData=data => data,
    appComponent=<div/>,
    reducers={},
    reduxMiddleware=[],
    routes=[],
    debug=false,
  } = config;

  const well = PromiseWell.create();
  const thunk = Thunker.create();
  const nav = navigationMiddleware.create(routes);

  const reds = combineReducers({ ...reducers, platform });
  const wares = reduxMiddleware.concat([nav, thunk, well.middleware]);

  if (debug) {
    wares.push(Logger)
  }

  return () => {
    const $container = document.getElementById(container);
    const $dataEl = document.getElementById(dataEl);

    let data;
    try {
      const temp = JSON.parse($dataEl.innerHTML);
      data = modifyData(temp);
    } catch (e) {
      data = {};
    }

    const store = createStore(reds, data, applyMiddleware(wares));

    ReactDOM.render(
      <Provider store={store}>
        {appComponent}
      </Provider>
    );
  };
}
