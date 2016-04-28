import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import pathToRegex from 'path-to-regexp';

const T = React.PropTypes;

export class Page extends React.Component {
  static propTypes = {
    url: T.string.isRequired,
  };

  render() {
    const { children } = this.props;

    if (Array.isArray(children)) {
      throw new Error('Page must have only one child');
    }

    return children;
  }
}

export class _PageSelector extends React.Component {
  static propTypes = {
    children: T.arrayOf(T.element),
    currentUrl: T.string.isRequired,
  };

  render() {
    const { children, currentUrl } = this.props;
    let defaultPage = null;

    for (let page of children) {
      const { url } = page.props;

      if (url === '*' && !defaultPage) {
        defaultPage = page;
      }

      const reg = pathToRegex(url);
      const result = reg.exec(currentUrl);

      if (result) {
        return page;
      }
    }

    return defaultPage || false;
  }
}

const selector = createSelector(
  state => state.platform.currentPage.url,
  currentUrl => ({ currentUrl })
);

export const PageSelector = connect(selector)(_PageSelector);
