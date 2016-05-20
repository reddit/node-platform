import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { isEqual, isEmpty } from 'lodash/lang';

import * as navigationActions from './actions';
import { METHODS } from './router';
import { extractQuery, createQuery } from './pageUtils';
import shouldGoBack from './shouldGoBack';

const T = React.PropTypes;

const isNewTabClick = (e) => e.metaKey || e.ctrlKey || e.button === 1 || e.button === 4;

// ****** Anchor
export class _Anchor extends React.Component {
  static propTypes = {
    href: T.string,
    noop: T.bool,
    className: T.string,
    style: T.object,
    navigateToPage: T.func,
  };

  static defaultProps = {
    href: '#',
    noop: false,
    navigateToPage: () => {},
  };

  handleClick = e => {
    if (isNewTabClick(e)) { return; }
    e.stopPropagation();
    e.preventDefault();

    const url = this.props.href.split('?')[0];
    const queryParams = extractQuery(this.props.href);

    this.props.navigateToPage(url, queryParams);
  }

  render() {
    const { href, className, style, children } = this.props;

    return (
      <a
        href={ href }
        className={ className }
        style={ style }
        onClick={ this.handleClick }
      >
        { children }
      </a>
    );
  }
};

export class _BackAnchor extends React.Component {
  static propTypes = {
    href: T.string,
    backupHref: T.string,
    noop: T.bool,
    className: T.string,
    style: T.object,
    referrer: T.string,
    navigateToPage: T.func,
  };

  static defaultProps = {
    href: '#',
    backupHref: '#',
    noop: false,
    referrer: '',
    navigateToPage: () => {},
  };

  static AUTO_ROUTE = '__backanchor-auto-route';

  handleClick = e => {
    if (isNewTabClick(e)) { return; }
    e.stopPropagation();
    e.preventDefault();

    const { urlHistory, currentIndex, href, referrer, backupHref } = this.props;

    const unParsedUrl = href === _BackAnchor.AUTO_ROUTE ? referrer || backupHref : href;
    const url = unParsedUrl.split('?')[0];
    const queryParams = extractQuery(unParsedUrl);

    if (shouldGoBack(urlHistory, currentIndex, url, queryParams)) {
      history.back();
    } else {
      this.props.navigateToPage(url, queryParams);
    }
  }

  render() {
    const { href, className, style, children, referrer, backupHref } = this.props;
    const renderHref = href === _BackAnchor.AUTO_ROUTE
      ? referrer || backupHref
      : href;

    return (
      <a
        href={ renderHref }
        className={ className }
        style={ style }
        onClick={ this.handleClick }
      >
        { children }
      </a>
    );
  }
};

const anchorSelector = createSelector(
  state => state.platform.history,
  state => state.platform.currentPageIndex,
  state => state.platform.currentPage.referrer,
  (urlHistory, currentIndex, referrer) => ({ urlHistory, currentIndex, referrer })
);

const anchorDispatcher = dispatch => ({
  navigateToPage: (url, queryParams) => dispatch(
    navigationActions.navigateToUrl(METHODS.GET, url, { queryParams })
  ),
});

export const Anchor = connect(null, anchorDispatcher)(_Anchor);
export const BackAnchor = connect(anchorSelector, anchorDispatcher)(_BackAnchor);
BackAnchor.AUTO_ROUTE = _BackAnchor.AUTO_ROUTE;

// ****** Form
const getValues = form => {
  if (!form || form.nodeName.toLowerCase() !== 'form') {
    return {};
  }

  return Array.from(form.elements).reduce((values, el) => {
    if (el.name) {
      switch(el.type) {
        case 'checkbox': {
          if (!values[el.name]) values[el.name] = [];
          if (el.value) values[el.name].push(el.value);
          break;
        }
        case 'select-multiple': {
          values[el.name] = Array.from(el.options).map(o => o.value);
        }
        case 'radio': {
          if (el.checked) values[el.name] = el.value;
        }
        default: {
          values[el.name] = el.value;
          break;
        }
      }
    }
    return values;
  }, {});
};

export class _Form extends React.Component {
  static propTypes = {
    action: T.string.isRequired,
    method: T.oneOf([METHODS.POST, METHODS.PUT, METHODS.DELETE, METHODS.PATCH]),
    className: T.string,
    style: T.object,
    onSubmit: T.func,
  };

  static defaultProps = {
    method: METHODS.POST,
    onSubmit: () => {},
  };

  handleSubmit = e => {
    e.preventDefault();

    const form = e.target;
    this.props.onSubmit(this.props.action, this.props.method, getValues(form));
  }

  render() {
    const { className, action, method, style, children } = this.props;

    return (
      <form
        className={ className}
        action={ action }
        method={ method }
        style={ style }
        onSubmit={ this.handleSubmit }
      >
        { children }
      </form>
    )
  }
}

const formDispatcher = dispatch => ({
  onSubmit: (url, method, bodyParams) => dispatch(
    navigationActions.navigateToUrl(method, url, { bodyParams })
  ),
});

export const Form = connect(null, formDispatcher)(_Form);


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
        if (hist.url === pathname && isEqual(hist.queryParams, currentQuery)) {
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
