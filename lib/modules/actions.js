import pathToRegex from 'path-to-regexp';

export const SET_PAGE = 'PLATFORM__SET_PAGE';
export const GOTO_PAGE_INDEX = 'PLATFORM__GOTO_PAGE_INDEX';
export const NAVIGATE_TO_COMMENTS = 'PLATFORM__NAVIGATE_TO_COMMENTS';

export const setPage = (pageType, component, url) => ({
  type: SET_PAGE,
  payload: { pageType, component, url },
});

export const gotoPageIndex = pageIndex => ({
  type: GOTO_PAGE_INDEX,
  payload: { pageIndex },
});

export const navigateToUrl = (
  routes,
  method,
  pathName,
  {
    queryParams={},
    hashParams={},
    bodyParams={},
  }={}
) => async function(dispatch, getState, waitForUser) {
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

      return await h[method](dispatch, getState, waitForUser);
    }
  }

  throw new Error(`No route found for ${pathName}`);
};

export default {
  SET_PAGE,
  GOTO_PAGE_INDEX,
  NAVIGATE_TO_COMMENTS,
  setPage,
  gotoPageIndex,
  navigateToUrl,
};
