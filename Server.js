(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("koa"), require("koa-router"), require("koa-bodyparser"), require("koa-static"), require("redux"), require("@r/middleware"), require("./reducer.js"), require("./actions.js"));
	else if(typeof define === 'function' && define.amd)
		define(["koa", "koa-router", "koa-bodyparser", "koa-static", "redux", "@r/middleware", "./reducer.js", "./actions.js"], factory);
	else if(typeof exports === 'object')
		exports["Server.js"] = factory(require("koa"), require("koa-router"), require("koa-bodyparser"), require("koa-static"), require("redux"), require("@r/middleware"), require("./reducer.js"), require("./actions.js"));
	else
		root["Server.js"] = factory(root["koa"], root["koa-router"], root["koa-bodyparser"], root["koa-static"], root["redux"], root["@r/middleware"], root["./reducer.js"], root["./actions.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _koa = __webpack_require__(1);

	var _koa2 = _interopRequireDefault(_koa);

	var _koaRouter = __webpack_require__(2);

	var _koaRouter2 = _interopRequireDefault(_koaRouter);

	var _koaBodyparser = __webpack_require__(3);

	var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

	var _koaStatic = __webpack_require__(4);

	var _koaStatic2 = _interopRequireDefault(_koaStatic);

	var _redux = __webpack_require__(5);

	var _middleware = __webpack_require__(6);

	var _reducer = __webpack_require__(7);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _actions = __webpack_require__(8);

	var _actions2 = _interopRequireDefault(_actions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	exports.default = function (config) {
	  var _config$port = config.port;
	  var port = _config$port === undefined ? 8888 : _config$port;
	  var _config$preRouteKoaMi = config.preRouteKoaMiddleware;
	  var preRouteKoaMiddleware = _config$preRouteKoaMi === undefined ? [] : _config$preRouteKoaMi;
	  var _config$postRouteKoaM = config.postRouteKoaMiddleware;
	  var postRouteKoaMiddleware = _config$postRouteKoaM === undefined ? [] : _config$postRouteKoaM;
	  var _config$reduxMiddlewa = config.reduxMiddleware;
	  var reduxMiddleware = _config$reduxMiddlewa === undefined ? [] : _config$reduxMiddlewa;
	  var _config$reduxReducers = config.reduxReducers;
	  var reduxReducers = _config$reduxReducers === undefined ? {} : _config$reduxReducers;
	  var _config$routes = config.routes;
	  var routes = _config$routes === undefined ? [] : _config$routes;
	  var _config$template = config.template;
	  var template = _config$template === undefined ? function () {} : _config$template;


	  var server = new _koa2.default();
	  var bodyparser = (0, _koaBodyparser2.default)();
	  var router = new _koaRouter2.default();

	  var handleRoute = function () {
	    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
	      var well, thunk, reducers, store, state;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              well = _middleware.PromiseWell.create();
	              thunk = _middleware.Thunker.create();
	              reducers = (0, _redux.combineReducers)(_extends({}, reduxReducers, {
	                platform: _reducer2.default
	              }));
	              store = createStore(reducers, {}, applyMiddleware(thunk, well.middleware));


	              store.dispatch(_actions2.default.navigateToUrl(routes, ctx.request.method.toLowerCase(), ctx.path, {
	                queryParams: ctx.request.query,
	                bodyParams: ctx.request.body
	              }));

	              _context.next = 7;
	              return well.onComplete();

	            case 7:
	              state = store.getState();


	              ctx.body = template(state);

	            case 9:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, undefined);
	    }));

	    return function handleRoute(_x, _x2) {
	      return ref.apply(this, arguments);
	    };
	  }();

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var route = _step.value;

	      var _route = _slicedToArray(route, 2);

	      var path = _route[0];
	      var handler = _route[1];
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = values(METHODS)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var method = _step2.value;

	          if (handler.prototype[method]) {
	            router[method](path, handleRoute);
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
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

	  preRouteKoaMiddleware.forEach(function (m) {
	    return server.use(m);
	  });
	  server.use(bodyparser);
	  server.use(router.routes());
	  server.use(router.allowedMethods());
	  postRouteKoaMiddleware.forEach(function (m) {
	    return server.use(m);
	  });

	  return function () {
	    server.listen(port, function () {
	      console.log('App launching on port ' + PORT);
	    });
	  };
	};

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

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("@r/middleware");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});
;