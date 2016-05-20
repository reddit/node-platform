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
  switch(action.type) {
    case actions.SET_PAGE: {
      const { url, urlParams, queryParams, hashParams, referrer } = action.payload;
      const relevantHistory = state.history.slice(0, state.currentPageIndex + 1);
      const referrerFromHistory = !isEmpty(state.currentPage)
        ? urlFromPage(state.currentPage)
        : '';

      const pageData = {
        url,
        urlParams,
        queryParams,
        hashParams,
        referrer: referrer || referrerFromHistory,
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
