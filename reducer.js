(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./actions.js"), require("./merge.js"));
	else if(typeof define === 'function' && define.amd)
		define(["./actions.js", "./merge.js"], factory);
	else if(typeof exports === 'object')
		exports["reducer.js"] = factory(require("./actions.js"), require("./merge.js"));
	else
		root["reducer.js"] = factory(root["./actions.js"], root["./merge.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_21__) {
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

	var _merge = __webpack_require__(21);

	var _merge2 = _interopRequireDefault(_merge);

	var _actions = __webpack_require__(8);

	var actions = _interopRequireWildcard(_actions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEFAULT = {
	  currentPageIndex: -1,
	  history: [],
	  currentPage: {}
	};

	exports.default = function () {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  switch (action.type) {
	    case actions.SET_PAGE:
	      {
	        var _action$payload = action.payload;
	        var url = _action$payload.url;
	        var urlParams = _action$payload.urlParams;
	        var queryParams = _action$payload.queryParams;
	        var hashParams = _action$payload.hashParams;

	        var relevantHistory = state.history.slice(0, state.currentPageIndex + 1);

	        return {
	          currentPageIndex: state.currentPageIndex + 1,
	          history: relevantHistory.concat([{ url: url, urlParams: urlParams, queryParams: queryParams, hashParams: hashParams }]),
	          currentPage: { url: url, urlParams: urlParams, queryParams: queryParams, hashParams: hashParams }
	        };
	      }
	    case actions.GOTO_PAGE_INDEX:
	      {
	        var pageIndex = action.payload.pageIndex;


	        return (0, _merge2.default)(state, {
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

/***/ },

/***/ 21:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ }

/******/ })
});
;