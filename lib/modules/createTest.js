import 'babel-polyfill';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import enzymeChai from 'chai-enzyme';
import { shallow, mount, render } from 'enzyme';
import jsdom from 'jsdom';

import React from 'react';
import { Thunker, PromiseWell } from '@r/middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import navigationMiddleware from './navigationMiddleware';
import platform from './reducer';

export default (optionsOrFn, fn) => {
  let cb;
  let options;

  if (fn) {
    options = optionsOrFn;
    cb = fn;
  } else {
    options = {};
    cb = optionsOrFn;
  }

  if (!global.document) {
    global.document = jsdom.jsdom('<div id="container"/>');
    global.window = document.defaultView;
    global.navigator = window.navigator;
  }

  const {
    reducers={},
    routes=[],
    middleware=[],
  } = options;

  const getStore = (initialState={}) => {
    const well = PromiseWell.create();
    const thunk = Thunker.create();
    const nav = navigationMiddleware.create(routes);

    const storeReducers = combineReducers({
      ...reducers,
      platform,
    });

    const storeMiddleware = middleware.concat([nav, thunk, well.middleware]);
    const store = createStore(storeReducers, initialState, applyMiddleware(...storeMiddleware));

    class StoreWrapper extends React.Component {
      render() {
        return (
          <Provider store={ store }>
            { this.props.children }
          </Provider>
        );
      }
    }

    return { store, StoreWrapper };
  };

  chai.use(sinonChai);
  chai.use(enzymeChai);
  const expect = chai.expect;

  cb({ shallow, mount, render, expect, getStore, sinon });
};
