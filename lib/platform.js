import Server from './modules/Server';
import Client from './modules/Client';
import reducer from './modules/reducer';
import router from './modules/router';
import navigationMiddleware from './modules/navigationMiddleware';
import * as actions from './modules/actions';

export {
  Server,
  Client,
  actions,
  reducer,
  router,
  navigationMiddleware,
};

export default {
  Server,
  Client,
  actions,
  reducer,
  router,
  navigationMiddleware,
};
