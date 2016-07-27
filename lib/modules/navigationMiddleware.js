import pathToRegex from 'path-to-regexp';
import { METHODS } from './router';
import * as actions from './actions';

export function parseRoute(path, routes) {
  let route;

  for (route of routes) {
    const [url, handler] = route;
    const reg = pathToRegex(url);
    const result = reg.exec(path);

    if (result) {
      return { handler, reg, result };
    }
  }
}

const findAndCallHandler = (store, routes, shouldSetPage, data) => {
  const { method, pathName, queryParams, hashParams, bodyParams, referrer } = data;
  const { dispatch, getState } = store;
  const route = parseRoute(pathName, routes);

  if (route) {
    const { handler, reg, result } = route;
    const urlParams = reg.keys.reduce((prev, cur, index) => ({
      ...prev,
      [cur.name]: result[index + 1],
    }), {});

    if (shouldSetPage && method === METHODS.GET) {
      dispatch(actions.setPage(pathName, {
        urlParams,
        queryParams,
        hashParams,
        referrer,
      }));
    }

    const h = new handler(
      pathName,
      urlParams,
      queryParams,
      hashParams,
      bodyParams,
      dispatch,
      getState
    );

    return h[method].bind(h);
  }

  return new Error(`No route found for ${method} ${pathName}`);
};

export default {
  create(routes) {
    return store => next => action => {
      if (action.type === actions.NAVIGATE_TO_URL) {
        next(action);
        return next(findAndCallHandler(store, routes, true, action.payload));
      }

      if (action.type === actions.GOTO_PAGE_INDEX) {
        next(action);
        return next(findAndCallHandler(store, routes, false, {
          ...action.payload,
          method: METHODS.GET,
        }));
      }

      return next(action);
    };
  },
};
