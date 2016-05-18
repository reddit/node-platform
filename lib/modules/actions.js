import { METHODS } from './router';

export const SET_PAGE = 'PLATFORM__SET_PAGE';
export const GOTO_PAGE_INDEX = 'PLATFORM__GOTO_PAGE_INDEX';
export const NAVIGATE_TO_URL = 'PLATFORM__NAVIGATE_TO_URL';
export const SET_SHELL = 'PLATFORM__SET_SHELL';
export const REROUTE_PAGE = 'PLATFORM__REROUTE_PAGE';

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

export const setShell = shell => ({ type: SET_SHELL, shell });

export const reroutePage = () => async (dispatch, getState) => {
  const { platform } = getState();
  const { currentPage } = platform;

  dispatch(navigateToUrl(
    METHODS.GET,
    currentPage.url,
    {
      queryParams: currentPage.queryParams,
      hashParams: currentPage.hashParams,
      bodyParams: {},
    }
  ));
};

export default {
  SET_PAGE,
  GOTO_PAGE_INDEX,
  NAVIGATE_TO_URL,
  SET_SHELL,
  REROUTE_PAGE,
  setPage,
  gotoPageIndex,
  navigateToUrl,
  setShell,
  reroutePage,
};
