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

const findLinkParent = el => {
  if (el.tagName === 'A') {
    return el;
  }

  if (el.parentNode) {
    return findLinkParent(el.parentNode);
  }
};

// ****** Anchor
export class _Anchor extends React.Component {
  static propTypes = {
    href: T.string,
    noop: T.bool,
    className: T.string,
    style: T.object,
    navigateToPage: T.func,
    onClick: T.func,
  };

  static defaultProps = {
    href: '#',
    noop: false,
    navigateToPage: () => {},
    onClick: () => {},
  };

  handleClick = e => {
    if (isNewTabClick(e)) { return; }

    this.props.onClick(e);
    if (e.defaultPrevented) { return; }

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
}

export class _BackAnchor extends React.Component {
  static propTypes = {
    href: T.string,
    backupHref: T.string,
    noop: T.bool,
    className: T.string,
    style: T.object,
    referrer: T.string,
    navigateToPage: T.func,
    onClick: T.func,
  };

  static defaultProps = {
    href: '#',
    backupHref: '#',
    noop: false,
    referrer: '',
    navigateToPage: () => {},
    onClick: () => {},
  };

  static AUTO_ROUTE = '__backanchor-auto-route';

  handleClick = e => {
    if (isNewTabClick(e)) { return; }

    this.props.onClick(e);
    if (e.defaultPrevented) { return; }

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
}

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

// ****** LinkJacker

// _LinkHijacker is a component used to explicitly hijack all link clicks
// in a given area and transform them into calls to navigationActions.navigateToUrl.
// This is useful in situations where you have content thats created
// outside of your app's react templates (e.g., user generated content or pages
// stored in a wiki).

export class _LinkHijacker extends React.Component {
  static propTypes = {
    className: T.string,
    style: T.object,
    urlRegexp: T.instanceOf(RegExp), // a regexp used to validate a url for
    // navigating to. It is expected that the regexp will handle capturing
    // the proper path we want to navigate to, in the first match. (match[1]);
    // (note: non-capturing groups might be helpful in doing so).
    navigateToPage: T.func,
    onClick: T.func,
    dangerouslySetInnerHTML: T.object,
  }

  static defaultProps = {
    navigateToPage: () => {},
    onClick: () => {},
  };

  extractValidPath($link) {
    let href = $link.getAttribute('href');
    if (!href) { return; }

    // if its a relative link, use it without validation
    if (href.indexOf('//') === -1) {
      return href;
    }

    // if we have a regexp to validate and extract paths, return it
    const { urlRegexp }= this.props;
    if (urlRegexp) {
      const match = href.match(urlRegexp);
      if (match && match[1]) {
        return match[1];
      }
    }
  }

  handleClick = e => {
    const $link = findLinkParent(e.target);
    if (!$link) { return; }

    if (isNewTabClick(e)) { return; }

    const path = this.extractValidPath($link);
    if (!path) { return; }

    this.props.onClick(path, e, $link);
    if (e.defaultPrevented) { return; }

    e.stopPropagation();
    e.preventDefault();


    const url = path.split('?')[0];
    const queryParams = extractQuery(path);

    this.props.navigateToPage(url, queryParams);
  }

  render() {
    // allows pass through of className, style, and dangerouslySetInnerHTML
    // props to match the react api
    const { className, style, dangerouslySetInnerHTML, children } = this.props;

    return (
      <div
        style={ style }
        className={ className }
        dangerouslySetInnerHTML={ dangerouslySetInnerHTML }
        onClick={ this.handleClick }
      >
        { children }
      </div>
    );
  }
}

export const LinkHijacker = connect(null, anchorDispatcher)(_LinkHijacker);

// ****** Form
const getValues = form => {
  if (!form || form.nodeName.toLowerCase() !== 'form') {
    return {};
  }

  return Array.from(form.elements).reduce((values, el) => {
    if (el.name) {
      switch (el.type) {
        case 'checkbox': {
          if (!values[el.name]) { values[el.name] = []; }
          if (el.value) { values[el.name].push(el.value); }
          break;
        }
        case 'select-multiple': {
          values[el.name] = Array.from(el.options).map(o => o.value);
          break;
        }
        case 'radio': {
          if (el.checked) { values[el.name] = el.value; }
          break;
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
    method: T.oneOf([METHODS.POST, METHODS.GET]),
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
        className={ className }
        action={ action }
        method={ method }
        style={ style }
        onSubmit={ this.handleSubmit }
      >
        { children }
      </form>
    );
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
    const page = history[pageIndex];
    const newUrl = page.url;
    const newQuery = page.queryParams;

    if ((self.location.pathname !== newUrl) || (!isEqual(currentQuery, newQuery))) {
      if (self.history && self.history.pushState) {
        let newHref = newUrl;
        if (!isEmpty(newQuery)) { newHref += createQuery(newQuery); }
        self.history.pushState({}, '', newHref);
      } else {
        self.location = newUrl;
      }
    }
  }

  render() {
    return false;
  }
}

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
