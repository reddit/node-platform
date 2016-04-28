export const SET_PAGE = 'PLATFORM__SET_PAGE';
export const GOTO_PAGE_INDEX = 'PLATFORM__GOTO_PAGE_INDEX';
export const NAVIGATE_TO_URL = 'PLATFORM__NAVIGATE_TO_URL';

export const setPage = (url, { urlParams={}, queryParams={}, hashParams={} }={}) => ({
  type: SET_PAGE,
  payload: { url, urlParams, queryParams, hashParams },
});

export const gotoPageIndex = pageIndex => ({
  type: GOTO_PAGE_INDEX,
  payload: { pageIndex },
});

export const navigateToUrl = (
  method,
  pathName,
  {
    queryParams={},
    hashParams={},
    bodyParams={},
  }={}
) => ({
  type: NAVIGATE_TO_URL,
  payload: { method, pathName, queryParams, hashParams, bodyParams },
});

export default {
  SET_PAGE,
  GOTO_PAGE_INDEX,
  NAVIGATE_TO_URL,
  setPage,
  gotoPageIndex,
  navigateToUrl,
};
