(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("lodash/lang"), require("./actions.js"), require("./pageUtils.js"), require("./router.js"), require("reselect"), require("./shouldGoBack.js"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "lodash/lang", "./actions.js", "./pageUtils.js", "./router.js", "reselect", "./shouldGoBack.js"], factory);
	else if(typeof exports === 'object')
		exports["components.js"] = factory(require("react"), require("react-redux"), require("lodash/lang"), require("./actions.js"), require("./pageUtils.js"), require("./router.js"), require("reselect"), require("./shouldGoBack.js"));
	else
		root["components.js"] = factory(root["react"], root["react-redux"], root["lodash/lang"], root["./actions.js"], root["./pageUtils.js"], root["./router.js"], root["reselect"], root["./shouldGoBack.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UrlSync = exports._UrlSync = exports.JSForm = exports.Form = exports._Form = exports.LinkHijacker = exports._LinkHijacker = exports.BackAnchor = exports.Anchor = exports._BackAnchor = exports._Anchor = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _reselect = __webpack_require__(16);

	var _lang = __webpack_require__(12);

	var _actions = __webpack_require__(13);

	var navigationActions = _interopRequireWildcard(_actions);

	var _router = __webpack_require__(15);

	var _pageUtils = __webpack_require__(14);

	var _shouldGoBack = __webpack_require__(17);

	var _shouldGoBack2 = _interopRequireDefault(_shouldGoBack);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var T = _react2.default.PropTypes;

	var isNewTabClick = function isNewTabClick(e) {
	  return e.metaKey || e.ctrlKey || e.button === 1 || e.button === 4;
	};

	var findLinkParent = function findLinkParent(el) {
	  if (el.tagName === 'A') {
	    return el;
	  }

	  if (el.parentNode) {
	    return findLinkParent(el.parentNode);
	  }
	};

	// ****** Anchor

	var _Anchor = exports._Anchor = function (_React$Component) {
	  _inherits(_Anchor, _React$Component);

	  function _Anchor() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, _Anchor);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_Anchor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (e) {
	      if (isNewTabClick(e)) {
	        return;
	      }

	      _this.props.onClick(e);
	      if (e.defaultPrevented) {
	        return;
	      }

	      e.stopPropagation();
	      e.preventDefault();

	      var url = _this.props.href.split('?')[0];
	      var queryParams = (0, _pageUtils.extractQuery)(_this.props.href);

	      _this.props.navigateToPage(url, queryParams);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(_Anchor, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var href = _props.href;
	      var className = _props.className;
	      var style = _props.style;
	      var children = _props.children;


	      return _react2.default.createElement(
	        'a',
	        {
	          href: href,
	          className: className,
	          style: style,
	          onClick: this.handleClick
	        },
	        children
	      );
	    }
	  }]);

	  return _Anchor;
	}(_react2.default.Component);

	_Anchor.propTypes = {
	  href: T.string,
	  noop: T.bool,
	  className: T.string,
	  style: T.object,
	  navigateToPage: T.func,
	  onClick: T.func
	};
	_Anchor.defaultProps = {
	  href: '#',
	  noop: false,
	  navigateToPage: function navigateToPage() {},
	  onClick: function onClick() {}
	};

	var _BackAnchor = exports._BackAnchor = function (_React$Component2) {
	  _inherits(_BackAnchor, _React$Component2);

	  function _BackAnchor() {
	    var _Object$getPrototypeO2;

	    var _temp2, _this2, _ret2;

	    _classCallCheck(this, _BackAnchor);

	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(_BackAnchor)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this2), _this2.handleClick = function (e) {
	      if (isNewTabClick(e)) {
	        return;
	      }

	      _this2.props.onClick(e);
	      if (e.defaultPrevented) {
	        return;
	      }

	      e.stopPropagation();
	      e.preventDefault();

	      var _this2$props = _this2.props;
	      var urlHistory = _this2$props.urlHistory;
	      var currentIndex = _this2$props.currentIndex;
	      var href = _this2$props.href;
	      var referrer = _this2$props.referrer;
	      var backupHref = _this2$props.backupHref;


	      var unParsedUrl = href === _BackAnchor.AUTO_ROUTE ? referrer || backupHref : href;
	      var url = unParsedUrl.split('?')[0];
	      var queryParams = (0, _pageUtils.extractQuery)(unParsedUrl);

	      if ((0, _shouldGoBack2.default)(urlHistory, currentIndex, url, queryParams)) {
	        history.back();
	      } else {
	        _this2.props.navigateToPage(url, queryParams);
	      }
	    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
	  }

	  _createClass(_BackAnchor, [{
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var href = _props2.href;
	      var className = _props2.className;
	      var style = _props2.style;
	      var children = _props2.children;
	      var referrer = _props2.referrer;
	      var backupHref = _props2.backupHref;

	      var renderHref = href === _BackAnchor.AUTO_ROUTE ? referrer || backupHref : href;

	      return _react2.default.createElement(
	        'a',
	        {
	          href: renderHref,
	          className: className,
	          style: style,
	          onClick: this.handleClick
	        },
	        children
	      );
	    }
	  }]);

	  return _BackAnchor;
	}(_react2.default.Component);

	_BackAnchor.propTypes = {
	  href: T.string,
	  backupHref: T.string,
	  noop: T.bool,
	  className: T.string,
	  style: T.object,
	  referrer: T.string,
	  navigateToPage: T.func,
	  onClick: T.func
	};
	_BackAnchor.defaultProps = {
	  href: '#',
	  backupHref: '#',
	  noop: false,
	  referrer: '',
	  navigateToPage: function navigateToPage() {},
	  onClick: function onClick() {}
	};
	_BackAnchor.AUTO_ROUTE = '__backanchor-auto-route';


	var anchorSelector = (0, _reselect.createSelector)(function (state) {
	  return state.platform.history;
	}, function (state) {
	  return state.platform.currentPageIndex;
	}, function (state) {
	  return state.platform.currentPage.referrer;
	}, function (urlHistory, currentIndex, referrer) {
	  return { urlHistory: urlHistory, currentIndex: currentIndex, referrer: referrer };
	});

	var anchorDispatcher = function anchorDispatcher(dispatch) {
	  return {
	    navigateToPage: function navigateToPage(url, queryParams) {
	      return dispatch(navigationActions.navigateToUrl(_router.METHODS.GET, url, { queryParams: queryParams }));
	    }
	  };
	};

	var Anchor = exports.Anchor = (0, _reactRedux.connect)(null, anchorDispatcher)(_Anchor);
	var BackAnchor = exports.BackAnchor = (0, _reactRedux.connect)(anchorSelector, anchorDispatcher)(_BackAnchor);
	BackAnchor.AUTO_ROUTE = _BackAnchor.AUTO_ROUTE;

	// ****** LinkJacker

	// _LinkHijacker is a component used to explicitly hijack all link clicks
	// in a given area and transform them into calls to navigationActions.navigateToUrl.
	// This is useful in situations where you have content thats created
	// outside of your app's react templates (e.g., user generated content or pages
	// stored in a wiki).
	// It purposefully doesn't render any markup and attaches its handlers to the child
	// element you pass in, allowing full control of the markup.

	var _LinkHijacker = exports._LinkHijacker = function (_React$Component3) {
	  _inherits(_LinkHijacker, _React$Component3);

	  function _LinkHijacker() {
	    var _Object$getPrototypeO3;

	    var _temp3, _this3, _ret3;

	    _classCallCheck(this, _LinkHijacker);

	    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      args[_key3] = arguments[_key3];
	    }

	    return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO3 = Object.getPrototypeOf(_LinkHijacker)).call.apply(_Object$getPrototypeO3, [this].concat(args))), _this3), _this3.onClick = function (e) {
	      // let the content node's click handler run first and allow it call
	      // preventDefault if desired.
	      var child = _this3.props.children;

	      if (child && child.props.onClick) {
	        child.props.onClick(e);
	        if (e.defaultPrevented) {
	          return;
	        }
	      }

	      var $link = findLinkParent(e.target);
	      if (!$link) {
	        return;
	      }

	      if (isNewTabClick(e)) {
	        return;
	      }

	      var path = _this3.extractValidPath($link);
	      if (!path) {
	        return;
	      }

	      _this3.props.onLinkClick(path, e, $link);
	      if (e.defaultPrevented) {
	        return;
	      }

	      e.stopPropagation();
	      e.preventDefault();

	      var url = path.split('?')[0];
	      var queryParams = (0, _pageUtils.extractQuery)(path);

	      _this3.props.navigateToPage(url, queryParams);
	    }, _temp3), _possibleConstructorReturn(_this3, _ret3);
	  }

	  _createClass(_LinkHijacker, [{
	    key: 'extractValidPath',
	    value: function extractValidPath($link) {
	      var href = $link.getAttribute('href');
	      if (!href) {
	        return;
	      }

	      // if its a relative link, use it without validation
	      if (href.indexOf('//') === -1) {
	        return href;
	      }

	      // if we have a regexp to validate and extract paths, return it
	      var urlRegexp = this.props.urlRegexp;

	      if (urlRegexp) {
	        var match = href.match(urlRegexp);
	        if (match && match[1]) {
	          return match[1];
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var child = this.props.children;


	      return _react2.default.cloneElement(_react2.default.Children.only(child), {
	        onClick: this.onClick
	      });
	    }
	  }]);

	  return _LinkHijacker;
	}(_react2.default.Component);

	_LinkHijacker.propTypes = {
	  children: T.element.isRequired,
	  onLinkClick: T.func, // you can use a normal onclick handler attached
	  // to your content node. Or, if you'd like to only run a click handler
	  // when a an a tag within this element tree has been clicked,
	  //  you can use `onLinkClick`
	  urlRegexp: T.instanceOf(RegExp), // a regexp used to validate a url for
	  // navigating to. It is expected that the regexp will handle capturing
	  // the proper path we want to navigate to, in the first match. (match[1]);
	  // (note: non-capturing groups might be helpful in doing so).
	  navigateToPage: T.func.isRequired };
	_LinkHijacker.defaultProps = {
	  navigateToPage: function navigateToPage() {},
	  onLinkClick: function onLinkClick() {}
	};
	var LinkHijacker = exports.LinkHijacker = (0, _reactRedux.connect)(null, anchorDispatcher)(_LinkHijacker);

	// ****** Form
	var getValues = function getValues(form) {
	  if (!form || form.nodeName.toLowerCase() !== 'form') {
	    return {};
	  }

	  return Array.from(form.elements).reduce(function (values, el) {
	    if (el.name) {
	      switch (el.type) {
	        case 'checkbox':
	          {
	            if (!values[el.name]) {
	              values[el.name] = [];
	            }
	            if (el.value) {
	              values[el.name].push(el.value);
	            }
	            break;
	          }
	        case 'select-multiple':
	          {
	            values[el.name] = Array.from(el.options).map(function (o) {
	              return o.value;
	            });
	            break;
	          }
	        case 'radio':
	          {
	            if (el.checked) {
	              values[el.name] = el.value;
	            }
	            break;
	          }
	        default:
	          {
	            values[el.name] = el.value;
	            break;
	          }
	      }
	    }
	    return values;
	  }, {});
	};

	var _Form = exports._Form = function (_React$Component4) {
	  _inherits(_Form, _React$Component4);

	  function _Form() {
	    var _Object$getPrototypeO4;

	    var _temp4, _this4, _ret4;

	    _classCallCheck(this, _Form);

	    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      args[_key4] = arguments[_key4];
	    }

	    return _ret4 = (_temp4 = (_this4 = _possibleConstructorReturn(this, (_Object$getPrototypeO4 = Object.getPrototypeOf(_Form)).call.apply(_Object$getPrototypeO4, [this].concat(args))), _this4), _this4.handleSubmit = function (e) {
	      e.preventDefault();

	      var form = e.target;
	      _this4.props.onSubmit(_this4.props.action, _this4.props.method, getValues(form));
	    }, _temp4), _possibleConstructorReturn(_this4, _ret4);
	  }

	  _createClass(_Form, [{
	    key: 'render',
	    value: function render() {
	      var _props3 = this.props;
	      var className = _props3.className;
	      var action = _props3.action;
	      var method = _props3.method;
	      var style = _props3.style;
	      var children = _props3.children;


	      return _react2.default.createElement(
	        'form',
	        {
	          className: className,
	          action: action,
	          method: method,
	          style: style,
	          onSubmit: this.handleSubmit
	        },
	        children
	      );
	    }
	  }]);

	  return _Form;
	}(_react2.default.Component);

	_Form.propTypes = {
	  action: T.string.isRequired,
	  method: T.oneOf([_router.METHODS.POST, _router.METHODS.GET]),
	  className: T.string,
	  style: T.object,
	  onSubmit: T.func
	};
	_Form.defaultProps = {
	  method: _router.METHODS.POST,
	  onSubmit: function onSubmit() {}
	};


	var formDispatcher = function formDispatcher(dispatch) {
	  return {
	    onSubmit: function onSubmit(url, method, bodyParams) {
	      return dispatch(navigationActions.navigateToUrl(method, url, { bodyParams: bodyParams }));
	    }
	  };
	};

	var Form = exports.Form = (0, _reactRedux.connect)(null, formDispatcher)(_Form);

	var JSForm = exports.JSForm = function (_React$Component5) {
	  _inherits(JSForm, _React$Component5);

	  function JSForm() {
	    var _Object$getPrototypeO5;

	    var _temp5, _this5, _ret5;

	    _classCallCheck(this, JSForm);

	    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      args[_key5] = arguments[_key5];
	    }

	    return _ret5 = (_temp5 = (_this5 = _possibleConstructorReturn(this, (_Object$getPrototypeO5 = Object.getPrototypeOf(JSForm)).call.apply(_Object$getPrototypeO5, [this].concat(args))), _this5), _this5.handleSubmit = function (e) {
	      e.preventDefault();
	      var form = e.target;
	      _this5.props.onSubmit(getValues(form));
	    }, _temp5), _possibleConstructorReturn(_this5, _ret5);
	  }

	  _createClass(JSForm, [{
	    key: 'render',
	    value: function render() {
	      var _props4 = this.props;
	      var className = _props4.className;
	      var style = _props4.style;
	      var children = _props4.children;


	      return _react2.default.createElement(
	        'form',
	        { className: className, style: style, onSubmit: this.handleSubmit },
	        children
	      );
	    }
	  }]);

	  return JSForm;
	}(_react2.default.Component);

	// ****** UrlSync


	JSForm.propTypes = {
	  onSubmit: T.func.isRequired,
	  className: T.string,
	  style: T.object
	};

	var _UrlSync = exports._UrlSync = function (_React$Component6) {
	  _inherits(_UrlSync, _React$Component6);

	  function _UrlSync() {
	    _classCallCheck(this, _UrlSync);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(_UrlSync).apply(this, arguments));
	  }

	  _createClass(_UrlSync, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this7 = this;

	      var handlePopstate = function handlePopstate() {
	        var pathname = self.location.pathname;
	        var currentQuery = (0, _pageUtils.extractQuery)(self.location.search);
	        var currentHash = {}; // TODO: address how hashes are displayed
	        var pageIndex = -1;
	        var hist = {};

	        for (var i = _this7.props.history.length - 1; i >= 0; i--) {
	          hist = _this7.props.history[i];
	          if (hist.url === pathname && (0, _lang.isEqual)(hist.queryParams, currentQuery)) {
	            pageIndex = i;
	            break;
	          }
	        }

	        if (pageIndex > -1) {
	          var _hist = hist;
	          var url = _hist.url;
	          var queryParams = _hist.queryParams;
	          var hashParams = _hist.hashParams;
	          var urlParams = _hist.urlParams;
	          var referrer = _hist.referrer;

	          _this7.props.gotoPageIndex(pageIndex, url, { queryParams: queryParams, hashParams: hashParams, urlParams: urlParams, referrer: referrer });
	        } else {
	          // can't find the url, just navigate
	          _this7.props.navigateToPage(pathname, currentQuery, currentHash);
	        }
	      };

	      self.addEventListener('popstate', handlePopstate);
	      self.addEventListener('hashchange', handlePopstate);
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(nextProps) {
	      var currentQuery = (0, _pageUtils.extractQuery)(self.location.search);
	      var pageIndex = nextProps.pageIndex;
	      var history = nextProps.history;

	      var page = history[pageIndex];
	      var newUrl = page.url;
	      var newQuery = page.queryParams;

	      if (self.location.pathname !== newUrl || !(0, _lang.isEqual)(currentQuery, newQuery)) {
	        if (self.history && self.history.pushState) {
	          var newHref = newUrl;
	          if (!(0, _lang.isEmpty)(newQuery)) {
	            newHref += (0, _pageUtils.createQuery)(newQuery);
	          }
	          self.history.pushState({}, '', newHref);
	        } else {
	          self.location = newUrl;
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return false;
	    }
	  }]);

	  return _UrlSync;
	}(_react2.default.Component);

	_UrlSync.propTypes = {
	  pageIndex: T.number.isRequired,
	  history: T.array.isRequired,
	  gotoPageIndex: T.func,
	  navigateToPage: T.func
	};
	_UrlSync.defaultProps = {
	  gotoPageIndex: function gotoPageIndex() {},
	  navigateToPage: function navigateToPage() {}
	};


	var urlSelector = (0, _reselect.createSelector)(function (state) {
	  return state.platform.currentPageIndex;
	}, function (state) {
	  return state.platform.history;
	}, function (pageIndex, history) {
	  return { pageIndex: pageIndex, history: history };
	});

	var urlDispatcher = function urlDispatcher(dispatch) {
	  return {
	    gotoPageIndex: function gotoPageIndex(index, url, data) {
	      return dispatch(navigationActions.gotoPageIndex(index, url, data));
	    },
	    navigateToPage: function navigateToPage(url, queryParams, hashParams) {
	      return dispatch(navigationActions.navigateToUrl(_router.METHODS.GET, url, { queryParams: queryParams, hashParams: hashParams }));
	    }
	  };
	};

	var UrlSync = exports.UrlSync = (0, _reactRedux.connect)(urlSelector, urlDispatcher)(_UrlSync);

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	module.exports = require("lodash/lang");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("reselect");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }
/******/ ])
});
;