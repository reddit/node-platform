(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("reselect"), require("path-to-regexp"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "reselect", "path-to-regexp"], factory);
	else if(typeof exports === 'object')
		exports["page.js"] = factory(require("react"), require("react-redux"), require("reselect"), require("path-to-regexp"));
	else
		root["page.js"] = factory(root["react"], root["react-redux"], root["reselect"], root["path-to-regexp"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_315__) {
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
	exports.PageSelector = exports._PageSelector = exports.Page = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _reselect = __webpack_require__(15);

	var _pathToRegexp = __webpack_require__(315);

	var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var T = _react2.default.PropTypes;

	var Page = exports.Page = function (_React$Component) {
	  _inherits(Page, _React$Component);

	  function Page() {
	    _classCallCheck(this, Page);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
	  }

	  _createClass(Page, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var component = _props.component;
	      var pageProperties = _props.pageProperties;

	      return component(pageProperties);
	    }
	  }]);

	  return Page;
	}(_react2.default.Component);

	Page.propTypes = {
	  url: T.string.isRequired,
	  component: T.func.isRequired,
	  pageProperties: T.object
	};

	var _PageSelector = exports._PageSelector = function (_React$Component2) {
	  _inherits(_PageSelector, _React$Component2);

	  function _PageSelector() {
	    _classCallCheck(this, _PageSelector);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(_PageSelector).apply(this, arguments));
	  }

	  _createClass(_PageSelector, [{
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props;
	      var children = _props2.children;
	      var currentPage = _props2.currentPage;

	      var pages = Array.isArray(children) ? children : [children];

	      var resultPage = null;

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = pages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var page = _step.value;
	          var url = page.props.url;


	          var reg = (0, _pathToRegexp2.default)(url);
	          var result = reg.exec(currentPage.url);

	          if (result) {
	            resultPage = page;
	            break;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      if (resultPage) {
	        return _react2.default.cloneElement(resultPage, { pageProperties: currentPage });
	      }
	    }
	  }]);

	  return _PageSelector;
	}(_react2.default.Component);

	_PageSelector.propTypes = {
	  children: T.oneOfType([T.arrayOf(T.element), T.object]),
	  currentPage: T.object.isRequired
	};


	var selector = (0, _reselect.createSelector)(function (state) {
	  return state.platform.currentPage;
	}, function (currentPage) {
	  return { currentPage: currentPage };
	});

	var PageSelector = exports.PageSelector = (0, _reactRedux.connect)(selector)(_PageSelector);

/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },

/***/ 5:
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },

/***/ 15:
/***/ function(module, exports) {

	module.exports = require("reselect");

/***/ },

/***/ 315:
/***/ function(module, exports) {

	module.exports = require("path-to-regexp");

/***/ }

/******/ })
});
;