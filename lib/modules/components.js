import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as navigationActions from './actions';

const T = React.PropTypes;

// export the unconnected version for testing purposes
export class _UrlSync extends React.Component {
  static propTypes = {
    pageIndex: T.number.isRequired,
    history: T.array.isRequired,
    gotoPageIndex: T.func,
    navigateToPage: T.func,
  };

  static defaultProps = {
    gotoPageIndex: () => {},
  };

  componentDidMount() {
    const handlePopstate = () => {
      const pathname = self.location.pathname;
      let pageIndex = -1;

      for (let i = this.props.history.length - 1; i >= 0; i--) {
        const hist = this.props.history[i];
        if (hist.url === pathname) {
          pageIndex = i;
          break;
        }
      }

      if (pageIndex > -1) {
        this.props.gotoPageIndex(pageIndex);
      } else {
        // can't find the url, just navigate
        this.props.navigateToPage(pathname);
      }
    };

    self.addEventListener('popstate', handlePopstate);
    self.addEventListener('hashchange', handlePopstate);
  }

  componentWillUpdate(nextProps) {
    const { pageIndex, history } = nextProps;
    const newUrl = history[pageIndex].url;

    if (self.location.pathname !== newUrl) {
      if (self.history && self.history.pushState) {
        self.history.pushState({}, '', history[pageIndex].url);
      } else {
        self.location = newUrl;
      }
    }
  }

  render() {
    return false;
  }
};

const selector = createSelector(
  state => state.platform.currentPageIndex,
  state => state.platform.history,
  (pageIndex, history) => ({ pageIndex, history })
);

const dispatcher = dispatch => ({
  gotoPageIndex: index => dispatch(navigationActions.gotoPageIndex(index)),
  navigateToPage: url => dispatch(navigationActions.navigateToUrl('get', url)),
});

export const UrlSync = connect(selector, dispatcher)(_UrlSync);
