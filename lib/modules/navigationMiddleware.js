import pathToRegex from 'path-to-regexp';
import { METHODS } from './router';
import * as actions from './actions';

export function parseRoute (url, routes) {
  let route;

  for (route of routes) {
    const [url, handler] = route;
    const reg = pathToRegex(url);
    const result = reg.exec(url);

    if (result) {
      return { handler, reg, result };
    }
  }
}

export default {
  create(routes) {
    return store => next => action => {
      if (action.type === actions.NAVIGATE_TO_URL) {
        const { method, pathName, queryParams, hashParams, bodyParams, referrer } = action.payload;
        const { dispatch, getState } = store;

        const route = parseRoute(pathName, routes);

        if (route) {
          const { handler, reg, result } = route;
          const urlParams = reg.keys.reduce((prev, cur, index) => ({
            ...prev,
            [cur.name]: result[index + 1],
          }), {});

          if (method === METHODS.GET) {
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

          return next(h[method].bind(h));
        }

        return next(new Error(`No route found for ${method} ${pathName}`));
      }

      return next(action);
    };
  },
};
