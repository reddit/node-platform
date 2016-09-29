export const METHODS = {
  HEAD: 'head',
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export class BaseHandler {
  constructor(originalUrl, urlParams, queryParams, hashParams, bodyParams) {
    this.originalUrl = originalUrl;
    this.urlParams = urlParams;
    this.queryParams = queryParams;
    this.hashParams = hashParams;
    this.bodyParams = bodyParams;
  }
}

export default {
  METHODS,
  BaseHandler,
};
