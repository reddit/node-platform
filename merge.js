(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash/lang"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash/lang"], factory);
	else if(typeof exports === 'object')
		exports["merge.js"] = factory(require("lodash/lang"));
	else
		root["merge.js"] = factory(root["lodash/lang"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_14__) {
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

	exports.default = merge;

	var _lang = __webpack_require__(14);

	function merge(state, stateDiff) {
	  var newState = _extends({}, state);

	  Object.keys(stateDiff).forEach(function (key) {
	    if ((0, _lang.isPlainObject)(newState[key]) && (0, _lang.isPlainObject)(stateDiff[key])) {
	      newState[key] = merge(newState[key], stateDiff[key]);
	    } else {
	      newState[key] = stateDiff[key];
	    }
	  });

	  return newState;
	}

/***/ },

/***/ 14:
/***/ function(module, exports) {

	module.exports = require("lodash/lang");

/***/ }

/******/ })
});
;