import { METHODS } from './router';

export const SET_PAGE = 'PLATFORM__SET_PAGE';
export const SET_STATUS = 'PLATFORM__SET_STATUS';
export const GOTO_PAGE_INDEX = 'PLATFORM__GOTO_PAGE_INDEX';
export const NAVIGATE_TO_URL = 'PLATFORM__NAVIGATE_TO_URL';
export const SET_SHELL = 'PLATFORM__SET_SHELL';
export const REROUTE_PAGE = 'PLATFORM__REROUTE_PAGE';

export const setPage = (url, { urlParams={}, queryParams={}, hashParams={}, referrer='' }={}) => ({
  type: SET_PAGE,
  payload: { url, urlParams, queryParams, hashParams, referrer },
});

export const gotoPageIndex = (
  pageIndex,
  pathName,
  {
    queryParams={},
    hashParams={},
    referrer='',
  }={}
) => ({
  type: GOTO_PAGE_INDEX,
  payload: { pageIndex, pathName, queryParams, hashParams, referrer },
});

export const navigateToUrl = (
  method,
  pathName,
  {
    queryParams={},
    hashParams={},
    bodyParams={},
    referrer='',
  }={}
) => ({
  type: NAVIGATE_TO_URL,
  payload: { method, pathName, queryParams, hashParams, bodyParams, referrer },
});

export const setShell = shell => ({ type: SET_SHELL, shell });

export const reroutePage = () => async (dispatch, getState) => {
  const { currentPage } = getState().platform;

  dispatch(navigateToUrl(
    METHODS.GET,
    currentPage.url,
    {
      queryParams: currentPage.queryParams,
      hashParams: currentPage.hashParams,
      bodyParams: {},
      referrer: currentPage.referrer,
    }
  ));
};

export const activateClient = () => async (dispatch, getState) => {
  const { platform } = getState();
  if (!platform.shell) { return; }

  dispatch(setShell(false));
  dispatch(reroutePage());
};

export const setStatus = status => ({ type: SET_STATUS, status });

export default {
  SET_PAGE,
  SET_STATUS,
  GOTO_PAGE_INDEX,
  NAVIGATE_TO_URL,
  SET_SHELL,
  REROUTE_PAGE,
  setPage,
  setStatus,
  gotoPageIndex,
  navigateToUrl,
  setShell,
  reroutePage,
};
