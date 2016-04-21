(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("./actions.js"), require("reselect"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "./actions.js", "reselect"], factory);
	else if(typeof exports === 'object')
		exports["components.js"] = factory(require("react"), require("react-redux"), require("./actions.js"), require("reselect"));
	else
		root["components.js"] = factory(root["react"], root["react-redux"], root["./actions.js"], root["reselect"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_20__) {
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UrlSync = exports._UrlSync = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _reselect = __webpack_require__(20);

	var _actions = __webpack_require__(8);

	var navigationActions = _interopRequireWildcard(_actions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var T = _react2.default.PropTypes;

	// export the unconnected version for testing purposes

	var _UrlSync = exports._UrlSync = function (_React$Component) {
	  _inherits(_UrlSync, _React$Component);

	  function _UrlSync() {
	    _classCallCheck(this, _UrlSync);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(_UrlSync).apply(this, arguments));
	  }

	  _createClass(_UrlSync, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var handlePopstate = function handlePopstate() {
	        var pathname = self.location.pathname;
	        var pageIndex = -1;

	        for (var i = _this2.props.history.length - 1; i >= 0; i--) {
	          var hist = _this2.props.history[i];
	          if (hist.url === pathname) {
	            pageIndex = i;
	            break;
	          }
	        }

	        if (pageIndex > -1) {
	          _this2.props.gotoPageIndex(pageIndex);
	        } else {
	          // can't find the url, just navigate
	          _this2.props.navigateToPage(pathname);
	        }
	      };

	      self.addEventListener('popstate', handlePopstate);
	      self.addEventListener('hashchange', handlePopstate);
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(nextProps) {
	      var pageIndex = nextProps.pageIndex;
	      var history = nextProps.history;

	      var newUrl = history[pageIndex].url;

	      if (self.location.pathname !== newUrl) {
	        if (self.history && self.history.pushState) {
	          self.history.pushState({}, '', history[pageIndex].url);
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
	  gotoPageIndex: function gotoPageIndex() {}
	};
	;

	var selector = (0, _reselect.createSelector)(function (state) {
	  return state.platform.currentPageIndex;
	}, function (state) {
	  return state.platform.history;
	}, function (pageIndex, history) {
	  return { pageIndex: pageIndex, history: history };
	});

	var dispatcher = function dispatcher(dispatch) {
	  return {
	    gotoPageIndex: function gotoPageIndex(index) {
	      return dispatch(navigationActions.gotoPageIndex(index));
	    },
	    navigateToPage: function navigateToPage(url) {
	      return dispatch(navigationActions.navigateToUrl('get', url));
	    }
	  };
	};

	var UrlSync = exports.UrlSync = (0, _reactRedux.connect)(selector, dispatcher)(_UrlSync);

/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },

/***/ 5:
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },

/***/ 20:
/***/ function(module, exports) {

	module.exports = require("reselect");

/***/ }

/******/ })
});
;