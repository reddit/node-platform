(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@r/middleware"), require("react"), require("react-dom"), require("redux"), require("react-redux"), require("./navigationMiddleware.js"), require("./reducer.js"), require("./actions.js"));
	else if(typeof define === 'function' && define.amd)
		define(["@r/middleware", "react", "react-dom", "redux", "react-redux", "./navigationMiddleware.js", "./reducer.js", "./actions.js"], factory);
	else if(typeof exports === 'object')
		exports["Client.js"] = factory(require("@r/middleware"), require("react"), require("react-dom"), require("redux"), require("react-redux"), require("./navigationMiddleware.js"), require("./reducer.js"), require("./actions.js"));
	else
		root["Client.js"] = factory(root["@r/middleware"], root["react"], root["react-dom"], root["redux"], root["react-redux"], root["./navigationMiddleware.js"], root["./reducer.js"], root["./actions.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _middleware = __webpack_require__(1);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _redux = __webpack_require__(4);

	var _reactRedux = __webpack_require__(5);

	var _navigationMiddleware = __webpack_require__(6);

	var _navigationMiddleware2 = _interopRequireDefault(_navigationMiddleware);

	var _reducer = __webpack_require__(7);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _actions = __webpack_require__(8);

	var _actions2 = _interopRequireDefault(_actions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	exports.default = function (config) {
	  var _config$container = config.container;
	  var container = _config$container === undefined ? 'container' : _config$container;
	  var _config$dataEl = config.dataEl;
	  var dataEl = _config$dataEl === undefined ? 'data' : _config$dataEl;
	  var _config$modifyData = config.modifyData;
	  var modifyData = _config$modifyData === undefined ? function (data) {
	    return data;
	  } : _config$modifyData;
	  var _config$appComponent = config.appComponent;
	  var appComponent = _config$appComponent === undefined ? _react2.default.createElement('div', null) : _config$appComponent;
	  var _config$reducers = config.reducers;
	  var reducers = _config$reducers === undefined ? {} : _config$reducers;
	  var _config$reduxMiddlewa = config.reduxMiddleware;
	  var reduxMiddleware = _config$reduxMiddlewa === undefined ? [] : _config$reduxMiddlewa;
	  var _config$routes = config.routes;
	  var routes = _config$routes === undefined ? [] : _config$routes;
	  var _config$debug = config.debug;
	  var debug = _config$debug === undefined ? false : _config$debug;


	  var well = _middleware.PromiseWell.create();
	  var thunk = _middleware.Thunker.create();
	  var nav = _navigationMiddleware2.default.create(routes);

	  var reds = (0, _redux.combineReducers)(_extends({}, reducers, { platform: _reducer2.default }));
	  var wares = reduxMiddleware.concat([nav, thunk, well.middleware]);

	  if (debug) {
	    wares.push(_middleware.Logger);
	  }

	  return function () {
	    var $container = document.getElementById(container);
	    var $dataEl = document.getElementById(dataEl);

	    var data = void 0;
	    try {
	      var temp = JSON.parse($dataEl.innerHTML);
	      data = modifyData(temp);
	    } catch (e) {
	      data = {};
	    }

	    var store = (0, _redux.createStore)(reds, data, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, _toConsumableArray(wares)), window.devToolsExtension ? window.devToolsExtension() : function (f) {
	      return f;
	    }));

	    _reactDom2.default.render(_react2.default.createElement(
	      _reactRedux.Provider,
	      { store: store },
	      appComponent
	    ), $container);
	  };
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("@r/middleware");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});
;