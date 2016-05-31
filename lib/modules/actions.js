import { METHODS } from './router';
import actions from './actions';

export const SET_PAGE = 'PLATFORM__SET_PAGE';
export const GOTO_PAGE_INDEX = 'PLATFORM__GOTO_PAGE_INDEX';
export const NAVIGATE_TO_URL = 'PLATFORM__NAVIGATE_TO_URL';
export const SET_SHELL = 'PLATFORM__SET_SHELL';
export const REROUTE_PAGE = 'PLATFORM__REROUTE_PAGE';

export const setPage = (url, {
  urlParams={},
  queryParams={},
  hashParams={},
  referrer='',
  name=''
}={}) => ({
  type: SET_PAGE,
  payload: { url, urlParams, queryParams, hashParams, referrer, name },
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
    referrer='',
  }={}
) => ({
  type: NAVIGATE_TO_URL,
  payload: {
    method,
    pathName,
    queryParams,
    hashParams,
    bodyParams,
    referrer,
  },
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
