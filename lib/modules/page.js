import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import pathToRegex from 'path-to-regexp';

const T = React.PropTypes;

export class Page extends React.Component {
  static propTypes = {
    url: T.string.isRequired,
    component: T.func.isRequired,
    pageProperties: T.object,
  };

  render() {
    const { component, pageProperties } = this.props;
    return component(pageProperties);
  }
}

export class _PageSelector extends React.Component {
  static propTypes = {
    children: T.oneOfType([T.arrayOf(T.element), T.object]),
    currentPage: T.object.isRequired,
  };

  render() {
    const { children, currentPage } = this.props;
    const pages = Array.isArray(children) ? children : [children];

    let defaultPage = null;
    let resultPage = null;

    for (let page of pages) {
      const { url } = page.props;

      if (url === '*' && !defaultPage) {
        defaultPage = page;
      }

      const reg = pathToRegex(url);
      const result = reg.exec(currentPage.url);

      if (result) {
        resultPage = page;
        break;
      }
    }

    resultPage = resultPage || defaultPage;

    if (resultPage) {
      return React.cloneElement(resultPage, { pageProperties: currentPage });
    }
  }
}

const selector = createSelector(
  state => state.platform.currentPage,
  currentPage => ({ currentPage })
);

export const PageSelector = connect(selector)(_PageSelector);
