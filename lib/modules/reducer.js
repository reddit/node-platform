import * as actions from './actions';

const DEFAULT = {
  currentPageIndex: -1,
  history: [],
  currentPage: null,
};

export default (state=DEFAULT, action={}) => {
  switch(action.type) {
    case actions.SET_PAGE: {
      const { pageType, url, component } = action.payload;
      const relevantHistory = state.history.slice(0, state.currentPageIndex + 1);

      return {
        currentPageIndex: state.currentPageIndex + 1,
        history: relevantHistory.concat([{ url, component, page: pageType }]),
        currentPage: { url, component, page: pageType },
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
    default: return state;
  }
}
