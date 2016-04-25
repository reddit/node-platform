(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("./actions.js"), require("lodash/object"), require("./router.js"), require("reselect"), require("lodash/lang"), require("./query.js"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "./actions.js", "lodash/object", "./router.js", "reselect", "lodash/lang", "./query.js"], factory);
	else if(typeof exports === 'object')
		exports["components.js"] = factory(require("react"), require("react-redux"), require("./actions.js"), require("lodash/object"), require("./router.js"), require("reselect"), require("lodash/lang"), require("./query.js"));
	else
		root["components.js"] = factory(root["react"], root["react-redux"], root["./actions.js"], root["lodash/object"], root["./router.js"], root["reselect"], root["lodash/lang"], root["./query.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_21__) {
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
	exports.UrlSync = exports._UrlSync = exports.Anchor = exports._Anchor = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _reselect = __webpack_require__(15);

	var _lang = __webpack_require__(16);

	var _object = __webpack_require__(13);

	var _actions = __webpack_require__(8);

	var navigationActions = _interopRequireWildcard(_actions);

	var _router = __webpack_require__(14);

	var _query = __webpack_require__(21);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var T = _react2.default.PropTypes;

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
	      e.stopPropagation();
	      e.preventDefault();

	      var url = _this.props.href.split('?')[0];
	      var queryParams = (0, _query.extractQuery)(_this.props.href);

	      _this.props.navigateToPage(url, queryParams);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(_Anchor, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var href = _props.href;
	      var className = _props.className;
	      var children = _props.children;


	      return _react2.default.createElement(
	        'a',
	        {
	          href: href,
	          className: className,
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
	  navigateToPage: T.func
	};
	_Anchor.defaultProps = {
	  href: '#',
	  noop: false,
	  navigateToPage: function navigateToPage() {}
	};
	;

	var anchorDispatcher = function anchorDispatcher(dispatch) {
	  return {
	    navigateToPage: function navigateToPage(url, queryParams) {
	      return dispatch(navigationActions.navigateToUrl(_router.METHODS.GET, url, { queryParams: queryParams }));
	    }
	  };
	};

	var Anchor = exports.Anchor = (0, _reactRedux.connect)(null, anchorDispatcher)(_Anchor);

	// ****** UrlSync

	var _UrlSync = exports._UrlSync = function (_React$Component2) {
	  _inherits(_UrlSync, _React$Component2);

	  function _UrlSync() {
	    _classCallCheck(this, _UrlSync);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(_UrlSync).apply(this, arguments));
	  }

	  _createClass(_UrlSync, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this3 = this;

	      var handlePopstate = function handlePopstate() {
	        var pathname = self.location.pathname;
	        var currentQuery = (0, _query.extractQuery)(self.location.search);
	        var currentHash = {}; // TODO: address how hashes are displayed
	        var pageIndex = -1;

	        for (var i = _this3.props.history.length - 1; i >= 0; i--) {
	          var hist = _this3.props.history[i];
	          if (hist.url === pathname && (0, _lang.isEqual)(hist.query, currentQuery)) {
	            pageIndex = i;
	            break;
	          }
	        }

	        if (pageIndex > -1) {
	          _this3.props.gotoPageIndex(pageIndex);
	        } else {
	          // can't find the url, just navigate
	          _this3.props.navigateToPage(pathname, currentQuery, currentHash);
	        }
	      };

	      self.addEventListener('popstate', handlePopstate);
	      self.addEventListener('hashchange', handlePopstate);
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(nextProps) {
	      var currentQuery = (0, _query.extractQuery)(self.location.search);
	      var pageIndex = nextProps.pageIndex;
	      var history = nextProps.history;

	      var page = history[pageIndex];
	      var newUrl = page.url;
	      var newQuery = page.queryParams;
	      var newHash = page.hashParams;

	      if (self.location.pathname !== newUrl || !(0, _lang.isEqual)(currentQuery, newQuery)) {
	        if (self.history && self.history.pushState) {
	          var newHref = newUrl;
	          if (!(0, _object.isEmpty)(newQuery)) newHref += (0, _query.createQuery)(newQuery);
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
	;

	var urlSelector = (0, _reselect.createSelector)(function (state) {
	  return state.platform.currentPageIndex;
	}, function (state) {
	  return state.platform.history;
	}, function (pageIndex, history) {
	  return { pageIndex: pageIndex, history: history };
	});

	var urlDispatcher = function urlDispatcher(dispatch) {
	  return {
	    gotoPageIndex: function gotoPageIndex(index) {
	      return dispatch(navigationActions.gotoPageIndex(index));
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
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	module.exports = require("lodash/object");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("reselect");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("lodash/lang");

/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ }
/******/ ])
});
;