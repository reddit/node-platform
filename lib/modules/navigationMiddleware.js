import pathToRegex from 'path-to-regexp';
import { METHODS } from './router';
import * as actions from './actions';

export function matchRoute(path, routes) {
  let route;

  for (route of routes) {
    const [url, handler, meta] = route;
    const reg = pathToRegex(url);
    const result = reg.exec(path);

    if (result) {
      return { handler, reg, result, meta };
    }
  }
}

const getRouteMeta = (routes, shouldSetPage, data) => {
  const { method, pathName } = data;
  const route = matchRoute(pathName, routes);

  if (route && route.meta && shouldSetPage && method === METHODS.GET) {
    return route.meta;
  }
  return undefined;
};

const findAndCallHandler = (store, routes, shouldSetPage, data) => {
  const { method, pathName, queryParams, hashParams, bodyParams, referrer } = data;
  const { dispatch, getState } = store;
  const route = matchRoute(pathName, routes);

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
  create(routes, onHandlerComplete) {
    return store => next => action => {
      let shouldSetPage;
      let payload;
      switch (action.type) {
        case actions.NAVIGATE_TO_URL:
        case actions.GOTO_PAGE_INDEX: {
          const startTime = new Date().getTime();
          next(action);
          if (action.type === actions.NAVIGATE_TO_URL) {
            shouldSetPage = true;
            payload = action.payload;
          } else {
            shouldSetPage = false;
            payload = { ...action.payload, method: METHODS.GET };
          }
          const meta = getRouteMeta(routes, shouldSetPage, payload);
          const handler = findAndCallHandler(store, routes, shouldSetPage, payload);
          const ret = next(handler);

          // When the handler completes, we get some timing info and pass it
          // along to onHandlerComplete
          const timeRoute = () => {
            const endTime = new Date().getTime();
            const duration = endTime - startTime;
            onHandlerComplete({ meta, startTime, endTime, duration });
          }

          ret
            .then(timeRoute)
            .catch(e => {
              timeRoute();
              throw e;
            });

          return ret;
        }
        default: return next(action);
      }
    };
  },
};
