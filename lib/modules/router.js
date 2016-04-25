import * as actions from './actions';

export const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export class BaseHandler {
  constructor(originalUrl, urlParams, queryParams, hashParams, bodyParams, dispatch, getState) {
    this.originalUrl = originalUrl;
    this.urlParams = urlParams;
    this.queryParams = queryParams;
    this.hashParams = hashParams;
    this.bodyParams = bodyParams;

    this.setPage = pageType => {
      dispatch(actions.setPage(pageType, this.originalUrl, {
        urlParams,
        queryParams,
        hashParams
      }));
    }
  }
};

export default {
  METHODS,
  BaseHandler,
};
