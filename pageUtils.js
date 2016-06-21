(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./merge.js"));
	else if(typeof define === 'function' && define.amd)
		define(["./merge.js"], factory);
	else if(typeof exports === 'object')
		exports["pageUtils.js"] = factory(require("./merge.js"));
	else
		root["pageUtils.js"] = factory(root["./merge.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_323__) {
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
	exports.urlFromPage = exports.createHash = exports.createQuery = exports.extractQuery = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _merge = __webpack_require__(323);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var extractQuery = exports.extractQuery = function extractQuery(str) {
	  var _str$split = str.split('?');

	  var _str$split2 = _slicedToArray(_str$split, 2);

	  var rest = _str$split2[1];

	  if (!(rest && rest.length)) {
	    return {};
	  }

	  // discard the hash

	  var _rest$split = rest.split('#');

	  var _rest$split2 = _slicedToArray(_rest$split, 1);

	  var query = _rest$split2[0];


	  return query.split('&').reduce(function (prev, cur) {
	    var _cur$split = cur.split('=');

	    var _cur$split2 = _slicedToArray(_cur$split, 2);

	    var key = _cur$split2[0];
	    var value = _cur$split2[1];


	    return _extends({}, prev, _defineProperty({}, key, decodeURIComponent(value)));
	  }, {});
	};

	var createQuery = exports.createQuery = function createQuery(dict) {
	  var qs = Object.keys(dict).filter(function (k) {
	    return typeof dict[k] !== 'undefined';
	  }).map(function (k) {
	    return k + '=' + encodeURIComponent(dict[k]);
	  }).join('&');

	  return '?' + qs;
	};

	var createHash = exports.createHash = function createHash(str) {
	  return '#' + str;
	};

	var urlFromPage = exports.urlFromPage = function urlFromPage(page, mergePage) {
	  var _ref = mergePage ? (0, _merge2.default)(page, mergePage) : page;

	  var queryParams = _ref.queryParams;
	  var hashParams = _ref.hashParams;
	  var url = _ref.url;

	  var queryString = Object.keys(queryParams).length ? '' + createQuery(queryParams) : '';
	  var hashString = Object.keys(hashParams).length ? '' + createHash(hashParams) : '';
	  return '' + url + queryString + hashString;
	};

/***/ },

/***/ 323:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_323__;

/***/ }

/******/ })
});
;