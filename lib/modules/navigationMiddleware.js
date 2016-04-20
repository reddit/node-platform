import pathToRegex from 'path-to-regexp';
import * as actions from './actions';

export default {
  create(routes) {
    return store => next => action => {
      if (action.type == actions.NAVIGATE_TO_URL) {
        const { method, pathName, queryParams, hashParams, bodyParams } = action.payload;
        const { dispatch, getState } = store;

        // let the action bubble down
        next(action);

        for (let route of routes) {
          const [url, handler] = route;
          const reg = pathToRegex(url);
          const result = reg.exec(pathName);

          if (result) {
            const urlParams = reg.keys.reduce((prev, cur, index) => ({
              ...prev,
              [cur.name]: result[index + 1],
            }), {});

            const h = new handler(
              pathName,
              urlParams,
              queryParams,
              hashParams,
              bodyParams,
            );

            return next(h[method].bind(h));
          }
        };

        return next(new Error(`No route found for ${method} ${pathName}`));
      }

      return next(action);
    };
  }
}
