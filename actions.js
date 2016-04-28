(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["actions.js"] = factory();
	else
		root["actions.js"] = factory();
})(this, function() {
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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SET_PAGE = exports.SET_PAGE = 'PLATFORM__SET_PAGE';
	var GOTO_PAGE_INDEX = exports.GOTO_PAGE_INDEX = 'PLATFORM__GOTO_PAGE_INDEX';
	var NAVIGATE_TO_URL = exports.NAVIGATE_TO_URL = 'PLATFORM__NAVIGATE_TO_URL';

	var setPage = exports.setPage = function setPage(url) {
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var _ref$urlParams = _ref.urlParams;
	  var urlParams = _ref$urlParams === undefined ? {} : _ref$urlParams;
	  var _ref$queryParams = _ref.queryParams;
	  var queryParams = _ref$queryParams === undefined ? {} : _ref$queryParams;
	  var _ref$hashParams = _ref.hashParams;
	  var hashParams = _ref$hashParams === undefined ? {} : _ref$hashParams;
	  return {
	    type: SET_PAGE,
	    payload: { url: url, urlParams: urlParams, queryParams: queryParams, hashParams: hashParams }
	  };
	};

	var gotoPageIndex = exports.gotoPageIndex = function gotoPageIndex(pageIndex) {
	  return {
	    type: GOTO_PAGE_INDEX,
	    payload: { pageIndex: pageIndex }
	  };
	};

	var navigateToUrl = exports.navigateToUrl = function navigateToUrl(method, pathName) {
	  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  var _ref2$queryParams = _ref2.queryParams;
	  var queryParams = _ref2$queryParams === undefined ? {} : _ref2$queryParams;
	  var _ref2$hashParams = _ref2.hashParams;
	  var hashParams = _ref2$hashParams === undefined ? {} : _ref2$hashParams;
	  var _ref2$bodyParams = _ref2.bodyParams;
	  var bodyParams = _ref2$bodyParams === undefined ? {} : _ref2$bodyParams;
	  return {
	    type: NAVIGATE_TO_URL,
	    payload: { method: method, pathName: pathName, queryParams: queryParams, hashParams: hashParams, bodyParams: bodyParams }
	  };
	};

	exports.default = {
	  SET_PAGE: SET_PAGE,
	  GOTO_PAGE_INDEX: GOTO_PAGE_INDEX,
	  NAVIGATE_TO_URL: NAVIGATE_TO_URL,
	  setPage: setPage,
	  gotoPageIndex: gotoPageIndex,
	  navigateToUrl: navigateToUrl
	};

/***/ }
/******/ ])
});
;