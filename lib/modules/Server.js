import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import { combineReducers } from 'redux';
import { values } from 'lodash/object';
import { Thunker, PromiseWell } from '@r/middleware';
import platform from './reducer';
import actions from './actions';
import { METHODS } from './router';

export default config => {
  const {
    port=8888,
    preRouteKoaMiddleware=[],
    postRouteKoaMiddleware=[],
    reduxMiddleware=[],
    reduxReducers={},
    routes=[],
    template=() => {},
  } = config;

  const server = new Koa();
  const bodyparser = KoaBodyParser();
  const router = new KoaRouter();

  const handleRoute = async (ctx, next) => {
    const well = PromiseWell.create();
    const thunk = Thunker.create();

    const reducers = combineReducers({
      ...reduxReducers,
      platform,
    });

    const store = createStore(reducers, {}, applyMiddleware(
      thunk,
      well.middleware,
    ));

    store.dispatch(actions.navigateToUrl(
      routes,
      ctx.request.method.toLowerCase(),
      ctx.path,
      {
        queryParams: ctx.request.query,
        bodyParams: ctx.request.body,
      }
    ));

    await well.onComplete();
    const state = store.getState();

    ctx.body = template(state);
  };

  for (let route of routes) {
    let [path, handler] = route;
    for (let method of values(METHODS)) {
      if (handler.prototype[method]) {
        router[method](path, handleRoute);
      }
    }
  }

  preRouteKoaMiddleware.forEach(m => server.use(m));
  server.use(bodyparser);
  server.use(router.routes());
  server.use(router.allowedMethods());
  postRouteKoaMiddleware.forEach(m => server.use(m));

  return () => {
    server.listen(port, () => {
      console.log(`App launching on port ${port}`);
    });
  };
}
