(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("path-to-regexp"));
	else if(typeof define === 'function' && define.amd)
		define(["path-to-regexp"], factory);
	else if(typeof exports === 'object')
		exports["actions.js"] = factory(require("path-to-regexp"));
	else
		root["actions.js"] = factory(root["path-to-regexp"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__) {
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
	exports.navigateToUrl = exports.gotoPageIndex = exports.setPage = exports.NAVIGATE_TO_COMMENTS = exports.GOTO_PAGE_INDEX = exports.SET_PAGE = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _pathToRegexp = __webpack_require__(9);

	var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	var SET_PAGE = exports.SET_PAGE = 'PLATFORM__SET_PAGE';
	var GOTO_PAGE_INDEX = exports.GOTO_PAGE_INDEX = 'PLATFORM__GOTO_PAGE_INDEX';
	var NAVIGATE_TO_COMMENTS = exports.NAVIGATE_TO_COMMENTS = 'PLATFORM__NAVIGATE_TO_COMMENTS';

	var setPage = exports.setPage = function setPage(pageType, component, url) {
	  return {
	    type: SET_PAGE,
	    payload: { pageType: pageType, component: component, url: url }
	  };
	};

	var gotoPageIndex = exports.gotoPageIndex = function gotoPageIndex(pageIndex) {
	  return {
	    type: GOTO_PAGE_INDEX,
	    payload: { pageIndex: pageIndex }
	  };
	};

	var navigateToUrl = exports.navigateToUrl = function navigateToUrl(routes, method, pathName) {
	  var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	  var _ref$queryParams = _ref.queryParams;
	  var queryParams = _ref$queryParams === undefined ? {} : _ref$queryParams;
	  var _ref$hashParams = _ref.hashParams;
	  var hashParams = _ref$hashParams === undefined ? {} : _ref$hashParams;
	  var _ref$bodyParams = _ref.bodyParams;
	  var bodyParams = _ref$bodyParams === undefined ? {} : _ref$bodyParams;
	  return function () {
	    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dispatch, getState, waitForUser) {
	      var _this = this;

	      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret;

	      return regeneratorRuntime.wrap(function _callee$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              _iteratorNormalCompletion = true;
	              _didIteratorError = false;
	              _iteratorError = undefined;
	              _context2.prev = 3;
	              _loop = regeneratorRuntime.mark(function _loop() {
	                var route, _route, url, handler, reg, result, urlParams, h;

	                return regeneratorRuntime.wrap(function _loop$(_context) {
	                  while (1) {
	                    switch (_context.prev = _context.next) {
	                      case 0:
	                        route = _step.value;
	                        _route = _slicedToArray(route, 2);
	                        url = _route[0];
	                        handler = _route[1];
	                        reg = (0, _pathToRegexp2.default)(url);
	                        result = reg.exec(pathName);

	                        if (!result) {
	                          _context.next = 13;
	                          break;
	                        }

	                        urlParams = reg.keys.reduce(function (prev, cur, index) {
	                          return _extends({}, prev, _defineProperty({}, cur.name, result[index + 1]));
	                        }, {});
	                        h = new handler(pathName, urlParams, queryParams, hashParams, bodyParams);
	                        _context.next = 11;
	                        return h[method](dispatch, getState, waitForUser);

	                      case 11:
	                        _context.t0 = _context.sent;
	                        return _context.abrupt('return', {
	                          v: _context.t0
	                        });

	                      case 13:
	                      case 'end':
	                        return _context.stop();
	                    }
	                  }
	                }, _loop, _this);
	              });
	              _iterator = routes[Symbol.iterator]();

	            case 6:
	              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
	                _context2.next = 14;
	                break;
	              }

	              return _context2.delegateYield(_loop(), 't0', 8);

	            case 8:
	              _ret = _context2.t0;

	              if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
	                _context2.next = 11;
	                break;
	              }

	              return _context2.abrupt('return', _ret.v);

	            case 11:
	              _iteratorNormalCompletion = true;
	              _context2.next = 6;
	              break;

	            case 14:
	              _context2.next = 20;
	              break;

	            case 16:
	              _context2.prev = 16;
	              _context2.t1 = _context2['catch'](3);
	              _didIteratorError = true;
	              _iteratorError = _context2.t1;

	            case 20:
	              _context2.prev = 20;
	              _context2.prev = 21;

	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }

	            case 23:
	              _context2.prev = 23;

	              if (!_didIteratorError) {
	                _context2.next = 26;
	                break;
	              }

	              throw _iteratorError;

	            case 26:
	              return _context2.finish(23);

	            case 27:
	              return _context2.finish(20);

	            case 28:
	              throw new Error('No route found for ' + pathName);

	            case 29:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee, this, [[3, 16, 20, 28], [21,, 23, 27]]);
	    }));

	    return function (_x2, _x3, _x4) {
	      return ref.apply(this, arguments);
	    };
	  }();
	};

	exports.default = {
	  SET_PAGE: SET_PAGE,
	  GOTO_PAGE_INDEX: GOTO_PAGE_INDEX,
	  NAVIGATE_TO_COMMENTS: NAVIGATE_TO_COMMENTS,
	  setPage: setPage,
	  gotoPageIndex: gotoPageIndex,
	  navigateToUrl: navigateToUrl
	};

/***/ },

/***/ 9:
/***/ function(module, exports) {

	module.exports = require("path-to-regexp");

/***/ }

/******/ })
});
;