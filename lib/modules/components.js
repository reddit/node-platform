import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { isEqual } from 'lodash/lang';
import { isEmpty } from 'lodash/object';

import * as navigationActions from './actions';
import { METHODS } from './router';
import { extractQuery, createQuery } from './query';

const T = React.PropTypes;

// ****** Anchor
export class _Anchor extends React.Component {
  static propTypes = {
    href: T.string,
    noop: T.bool,
    className: T.string,
    navigateToPage: T.func,
  };

  static defaultProps = {
    href: '#',
    noop: false,
    navigateToPage: () => {},
  };

  handleClick = e => {
    e.stopPropagation();
    e.preventDefault();

    const url = this.props.href.split('?')[0];
    const queryParams = extractQuery(this.props.href);

    this.props.navigateToPage(url, queryParams);
  }

  render() {
    const { href, className, children } = this.props;

    return (
      <a
        href={ href }
        className={ className }
        onClick={ this.handleClick }
      >
        { children }
      </a>
    );
  }
};

const anchorDispatcher = dispatch => ({
  navigateToPage: (url, queryParams) => dispatch(
    navigationActions.navigateToUrl(METHODS.GET, url, { queryParams })
  ),
});

export const Anchor = connect(null, anchorDispatcher)(_Anchor);

// ****** UrlSync
export class _UrlSync extends React.Component {
  static propTypes = {
    pageIndex: T.number.isRequired,
    history: T.array.isRequired,
    gotoPageIndex: T.func,
    navigateToPage: T.func,
  };

  static defaultProps = {
    gotoPageIndex: () => {},
    navigateToPage: () => {},
  };

  componentDidMount() {
    const handlePopstate = () => {
      const pathname = self.location.pathname;
      const currentQuery = extractQuery(self.location.search);
      const currentHash = {}; // TODO: address how hashes are displayed
      let pageIndex = -1;

      for (let i = this.props.history.length - 1; i >= 0; i--) {
        const hist = this.props.history[i];
        if (hist.url === pathname && isEqual(hist.query, currentQuery)) {
          pageIndex = i;
          break;
        }
      }

      if (pageIndex > -1) {
        this.props.gotoPageIndex(pageIndex);
      } else {
        // can't find the url, just navigate
        this.props.navigateToPage(pathname, currentQuery, currentHash);
      }
    };

    self.addEventListener('popstate', handlePopstate);
    self.addEventListener('hashchange', handlePopstate);
  }

  componentWillUpdate(nextProps) {
    const currentQuery = extractQuery(self.location.search);
    const { pageIndex, history } = nextProps;
    const page = history[pageIndex]
    const newUrl = page.url;
    const newQuery = page.queryParams;
    const newHash = page.hashParams;

    if ((self.location.pathname !== newUrl) || (!isEqual(currentQuery, newQuery))) {
      if (self.history && self.history.pushState) {
        let newHref = newUrl;
        if (!isEmpty(newQuery)) newHref += createQuery(newQuery);
        self.history.pushState({}, '', newHref);
      } else {
        self.location = newUrl;
      }
    }
  }

  render() {
    return false;
  }
};

const urlSelector = createSelector(
  state => state.platform.currentPageIndex,
  state => state.platform.history,
  (pageIndex, history) => ({ pageIndex, history })
);

const urlDispatcher = dispatch => ({
  gotoPageIndex: index => dispatch(navigationActions.gotoPageIndex(index)),
  navigateToPage: (url, queryParams, hashParams) => dispatch(
    navigationActions.navigateToUrl(METHODS.GET, url, { queryParams, hashParams })
  ),
});

export const UrlSync = connect(urlSelector, urlDispatcher)(_UrlSync);
