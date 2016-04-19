(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("koa"), require("koa-router"), require("koa-bodyparser"), require("koa-static"));
	else if(typeof define === 'function' && define.amd)
		define(["koa", "koa-router", "koa-bodyparser", "koa-static"], factory);
	else if(typeof exports === 'object')
		exports["Server.js"] = factory(require("koa"), require("koa-router"), require("koa-bodyparser"), require("koa-static"));
	else
		root["Server.js"] = factory(root["koa"], root["koa-router"], root["koa-bodyparser"], root["koa-static"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

	var _koa = __webpack_require__(1);

	var _koa2 = _interopRequireDefault(_koa);

	var _koaRouter = __webpack_require__(2);

	var _koaRouter2 = _interopRequireDefault(_koaRouter);

	var _koaBodyparser = __webpack_require__(3);

	var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

	var _koaStatic = __webpack_require__(4);

	var _koaStatic2 = _interopRequireDefault(_koaStatic);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("koa");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("koa-router");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("koa-bodyparser");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("koa-static");

/***/ }
/******/ ])
});
;