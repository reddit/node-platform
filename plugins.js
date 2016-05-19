(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./actions.js"));
	else if(typeof define === 'function' && define.amd)
		define(["./actions.js"], factory);
	else if(typeof exports === 'object')
		exports["plugins.js"] = factory(require("./actions.js"));
	else
		root["plugins.js"] = factory(root["./actions.js"]);
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
	exports.dispatchInitialShell = undefined;

	var _actions = __webpack_require__(14);

	var _actions2 = _interopRequireDefault(_actions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dispatchInitialShell = exports.dispatchInitialShell = function dispatchInitialShell(ctx, dispatch) {
	  // If user is a bot, or if user has a "nojs" querystring or cookie, do full
	  // server-side rendering. Otherwise, use logic to bypass API requests.
	  var isBot = (ctx.headers['user-agent'] || '').indexOf('bot') > -1;
	  var hasNoJsCookie = !!ctx.cookies.get('nojs');
	  var hasNoJsQuerystring = !!ctx.query.nojs;

	  // Use should get a shell if not a bot and has not asked for the no-js version
	  // via querystring or cookie.
	  var useShell = !(isBot || hasNoJsCookie || hasNoJsQuerystring);

	  // If the user is a bot or has the querystring, but doesn't have a cookie, set
	  // a cookie for next time for 30 days.
	  if (!useShell && !hasNoJsCookie) {
	    var expires = new Date();
	    expires.setDate(expires.getDate() + 30);

	    ctx.cookies.set('shell', 'false', {
	      expires: expires
	    });
	  }

	  dispatch(_actions2.default.setShell(useShell));
	};

/***/ },

/***/ 14:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }

/******/ })
});
;