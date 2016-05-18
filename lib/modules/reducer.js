import merge from './merge';
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
      const { url, urlParams, queryParams, hashParams } = action.payload;
      const relevantHistory = state.history.slice(0, state.currentPageIndex + 1);

      return {
        ...state,
        currentPageIndex: state.currentPageIndex + 1,
        history: relevantHistory.concat([{ url, urlParams, queryParams, hashParams }]),
        currentPage: { url, urlParams, queryParams, hashParams },
      };
    }
    case actions.GOTO_PAGE_INDEX: {
      const { pageIndex } = action.payload;

      return merge(state, {
        currentPageIndex: pageIndex,
        currentPage: state.history[pageIndex],
      });
    }
    case actions.SET_SHELL: {
      return merge(state, {
        shell: action.shell,
      });
    }
    default: return state;
  }
};
