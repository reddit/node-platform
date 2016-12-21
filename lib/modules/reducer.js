import { isEmpty } from 'lodash/lang';

import merge from './merge';
import { urlFromPage } from './pageUtils';
import * as actions from './actions';

const DEFAULT = {
  currentPageIndex: -1,
  history: [],
  currentPage: {},
  shell: false,
};

export default (state=DEFAULT, action={}) => {
  switch (action.type) {
    case actions.SET_STATUS: {
      const pageData = merge(state.currentPage, { status: action.payload.status });
      const history = [...state.history];
      history[state.currentPageIndex] = pageData;

      return { ...state, history, currentPage: pageData};
    }

    case actions.SET_PAGE: {
      const historyLen = state.history.length;
      const referrerFromHistory = !isEmpty(state.currentPage) && historyLen > 1
        ? urlFromPage(state.currentPage)
        : '';

      const {
        url,
        urlParams,
        queryParams,
        hashParams,
        referrer,
        status=200,
      } = action.payload;

      const routeReferrer = referrer ? referrer : referrerFromHistory;

      const relevantHistory = state.history.slice(0, state.currentPageIndex + 1);
      const pageData = {
        url,
        urlParams,
        queryParams,
        hashParams,
        status,
        referrer: routeReferrer,
      };

      return {
        ...state,
        currentPageIndex: state.currentPageIndex + 1,
        history: relevantHistory.concat([pageData]),
        currentPage: pageData,
      };
    }

    case actions.GOTO_PAGE_INDEX: {
      const { pageIndex } = action.payload;

      return {
        ...state,
        currentPageIndex: pageIndex,
        currentPage: state.history[pageIndex],
      };
    }

    case actions.SET_SHELL: {
      return merge(state, {
        shell: action.shell,
      });
    }

    default: return state;
  }
};
