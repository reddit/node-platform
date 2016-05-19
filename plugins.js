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

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	var dispatchInitialShell = exports.dispatchInitialShell = function () {
	  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, dispatch) {
	    var isBot, hasNoJsCookie, hasNoJsQuerystring, useShell, expires;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            // If user is a bot, or if user has a "nojs" querystring or cookie, do full
	            // server-side rendering. Otherwise, use logic to bypass API requests.
	            isBot = (ctx.headers['user-agent'] || '').indexOf('bot') > -1;
	            hasNoJsCookie = !!ctx.cookies.get('nojs');
	            hasNoJsQuerystring = !!ctx.query.nojs;

	            // Use should get a shell if not a bot and has not asked for the no-js version
	            // via querystring or cookie.

	            useShell = !(isBot || hasNoJsCookie || hasNoJsQuerystring);

	            // If the user is a bot or has the querystring, but doesn't have a cookie, set
	            // a cookie for next time for 30 days.

	            if (!useShell && !hasNoJsCookie) {
	              expires = new Date();

	              expires.setDate(expires.getDate() + 30);

	              ctx.cookies.set('shell', 'false', {
	                expires: expires
	              });
	            }

	            dispatch(_actions2.default.setShell(useShell));

	          case 6:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, undefined);
	  }));

	  return function dispatchInitialShell(_x, _x2) {
	    return ref.apply(this, arguments);
	  };
	}();

/***/ },

/***/ 14:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }

/******/ })
});
;