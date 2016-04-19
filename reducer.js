(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./actions.js"));
	else if(typeof define === 'function' && define.amd)
		define(["./actions.js"], factory);
	else if(typeof exports === 'object')
		exports["reducer.js"] = factory(require("./actions.js"));
	else
		root["reducer.js"] = factory(root["./actions.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__) {
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _actions = __webpack_require__(8);

	var actions = _interopRequireWildcard(_actions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var DEFAULT = {
	  currentPageIndex: -1,
	  history: [],
	  currentPage: null
	};

	exports.default = function () {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  switch (action.type) {
	    case actions.SET_PAGE:
	      {
	        var _action$payload = action.payload;
	        var pageType = _action$payload.pageType;
	        var url = _action$payload.url;
	        var component = _action$payload.component;

	        var relevantHistory = state.history.slice(0, state.currentPageIndex + 1);

	        return {
	          currentPageIndex: state.currentPageIndex + 1,
	          history: relevantHistory.concat([{ url: url, component: component, page: pageType }]),
	          currentPage: { url: url, component: component, page: pageType }
	        };
	      }
	    case actions.GOTO_PAGE_INDEX:
	      {
	        var pageIndex = action.payload.pageIndex;


	        return _extends({}, state, {
	          currentPageIndex: pageIndex,
	          currentPage: state.history[pageIndex]
	        });
	      }
	    default:
	      return state;
	  }
	};

/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }

/******/ })
});
;