(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./navigationMiddleware.js"), require("./reducer.js"), require("./actions.js"), require("./router.js"), require("./merge.js"), require("./Client.js"), require("./components.js"), require("./url.js"), require("./Server.js"));
	else if(typeof define === 'function' && define.amd)
		define(["./navigationMiddleware.js", "./reducer.js", "./actions.js", "./router.js", "./merge.js", "./Client.js", "./components.js", "./url.js", "./Server.js"], factory);
	else if(typeof exports === 'object')
		exports["platform.js"] = factory(require("./navigationMiddleware.js"), require("./reducer.js"), require("./actions.js"), require("./router.js"), require("./merge.js"), require("./Client.js"), require("./components.js"), require("./url.js"), require("./Server.js"));
	else
		root["platform.js"] = factory(root["./navigationMiddleware.js"], root["./reducer.js"], root["./actions.js"], root["./router.js"], root["./merge.js"], root["./Client.js"], root["./components.js"], root["./url.js"], root["./Server.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_317__, __WEBPACK_EXTERNAL_MODULE_318__, __WEBPACK_EXTERNAL_MODULE_319__, __WEBPACK_EXTERNAL_MODULE_320__, __WEBPACK_EXTERNAL_MODULE_321__) {
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
	exports.Server = exports.router = exports.reducer = exports.url = exports.navigationMiddleware = exports.merge = exports.components = exports.Client = exports.actions = undefined;

	var _actions = __webpack_require__(14);

	var actions = _interopRequireWildcard(_actions);

	var _Client = __webpack_require__(318);

	var _Client2 = _interopRequireDefault(_Client);

	var _components = __webpack_require__(319);

	var _components2 = _interopRequireDefault(_components);

	var _merge = __webpack_require__(317);

	var _merge2 = _interopRequireDefault(_merge);

	var _navigationMiddleware = __webpack_require__(6);

	var _navigationMiddleware2 = _interopRequireDefault(_navigationMiddleware);

	var _url = __webpack_require__(320);

	var _url2 = _interopRequireDefault(_url);

	var _reducer = __webpack_require__(7);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _router = __webpack_require__(16);

	var _router2 = _interopRequireDefault(_router);

	var _Server = __webpack_require__(321);

	var _Server2 = _interopRequireDefault(_Server);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.actions = actions;
	exports.Client = _Client2.default;
	exports.components = _components2.default;
	exports.merge = _merge2.default;
	exports.navigationMiddleware = _navigationMiddleware2.default;
	exports.url = _url2.default;
	exports.reducer = _reducer2.default;
	exports.router = _router2.default;
	exports.Server = _Server2.default;
	exports.default = {
	  actions: actions,
	  Client: _Client2.default,
	  components: _components2.default,
	  merge: _merge2.default,
	  navigationMiddleware: _navigationMiddleware2.default,
	  url: _url2.default,
	  reducer: _reducer2.default,
	  router: _router2.default,
	  Server: _Server2.default
	};

/***/ },

/***/ 6:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },

/***/ 7:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },

/***/ 14:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },

/***/ 16:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },

/***/ 317:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_317__;

/***/ },

/***/ 318:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_318__;

/***/ },

/***/ 319:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_319__;

/***/ },

/***/ 320:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_320__;

/***/ },

/***/ 321:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_321__;

/***/ }

/******/ })
});
;