import merge from './merge';
import * as actions from './actions';

const DEFAULT = {
  currentPageIndex: -1,
  history: [],
  currentPage: null,
};

export default (state=DEFAULT, action={}) => {
  switch(action.type) {
    case actions.SET_PAGE: {
      const { pageType, url, urlParams, queryParams, hashParams } = action.payload;
      const relevantHistory = state.history.slice(0, state.currentPageIndex + 1);

      return {
        currentPageIndex: state.currentPageIndex + 1,
        history: relevantHistory.concat([{ url, urlParams, queryParams, hashParams, page: pageType }]),
        currentPage: { url, urlParams, queryParams, hashParams, page: pageType },
      };
    }
    case actions.GOTO_PAGE_INDEX: {
      const { pageIndex } = action.payload;

      return merge(state, {
        currentPageIndex: pageIndex,
        currentPage: state.history[pageIndex],
      });
    }
    default: return state;
  }
}
