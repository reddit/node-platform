(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./actions.js"), require("./router.js"), require("path-to-regexp"));
	else if(typeof define === 'function' && define.amd)
		define(["./actions.js", "./router.js", "path-to-regexp"], factory);
	else if(typeof exports === 'object')
		exports["navigationMiddleware.js"] = factory(require("./actions.js"), require("./router.js"), require("path-to-regexp"));
	else
		root["navigationMiddleware.js"] = factory(root["./actions.js"], root["./router.js"], root["path-to-regexp"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_316__) {
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

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _pathToRegexp = __webpack_require__(316);

	var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

	var _router = __webpack_require__(16);

	var _actions = __webpack_require__(14);

	var actions = _interopRequireWildcard(_actions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	exports.default = {
	  create: function create(routes) {
	    return function (store) {
	      return function (next) {
	        return function (action) {
	          if (action.type == actions.NAVIGATE_TO_URL) {
	            var _action$payload = action.payload;
	            var method = _action$payload.method;
	            var pathName = _action$payload.pathName;
	            var queryParams = _action$payload.queryParams;
	            var hashParams = _action$payload.hashParams;
	            var bodyParams = _action$payload.bodyParams;
	            var referrer = _action$payload.referrer;
	            var dispatch = store.dispatch;
	            var getState = store.getState;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	              var _loop = function _loop() {
	                var route = _step.value;

	                var _route = _slicedToArray(route, 2);

	                var url = _route[0];
	                var handler = _route[1];

	                var reg = (0, _pathToRegexp2.default)(url);
	                var result = reg.exec(pathName);

	                if (result) {
	                  var urlParams = reg.keys.reduce(function (prev, cur, index) {
	                    return _extends({}, prev, _defineProperty({}, cur.name, result[index + 1]));
	                  }, {});

	                  if (method === _router.METHODS.GET) {
	                    dispatch(actions.setPage(pathName, {
	                      urlParams: urlParams,
	                      queryParams: queryParams,
	                      hashParams: hashParams,
	                      referrer: referrer
	                    }));
	                  }

	                  var h = new handler(pathName, urlParams, queryParams, hashParams, bodyParams, dispatch, getState);

	                  return {
	                    v: next(h[method].bind(h))
	                  };
	                }
	              };

	              for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var _ret = _loop();

	                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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

	            ;

	            return next(new Error('No route found for ' + method + ' ' + pathName));
	          }

	          return next(action);
	        };
	      };
	    };
	  }
	};

/***/ },

/***/ 14:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },

/***/ 16:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },

/***/ 316:
/***/ function(module, exports) {

	module.exports = require("path-to-regexp");

/***/ }

/******/ })
});
;