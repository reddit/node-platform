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
  return null;
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

    // set page only if its a HEAD or a GET. setting page data is required
    // to make sure request rendering and redirects work correctly
    // The only reason HEAD is included is because its the same as GET but
    // it doesn't have a response body.
    if (shouldSetPage && (method === METHODS.GET || method === METHODS.HEAD)) {
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

    let handlerMethod = method;
    // HEAD requests are supposed to have the exact same headers and redirects
    // as a GET request, but they must not send a response body.
    // To support HEAD requests, we can check if the handler
    // has a specific HEAD function, otherwise we just use its GET function
    if (handlerMethod === METHODS.HEAD && !h[METHODS.HEAD]) {
      handlerMethod = METHODS.GET;
    }

    if (!h[handlerMethod]) {
      throw new Error(`No method found for ${method.toUpperCase()} ${pathName}`);
    }

    return h[handlerMethod].bind(h);
  }

  throw new Error(`No route found for ${method.toUpperCase()} ${pathName}`);
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
