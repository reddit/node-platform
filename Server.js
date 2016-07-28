(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@r/middleware"), require("redux"), require("./navigationMiddleware.js"), require("./reducer.js"), require("koa"), require("koa-router"), require("koa-bodyparser"), require("lodash/object"), require("lodash/lang"), require("./actions.js"), require("./pageUtils.js"), require("./router.js"));
	else if(typeof define === 'function' && define.amd)
		define(["@r/middleware", "redux", "./navigationMiddleware.js", "./reducer.js", "koa", "koa-router", "koa-bodyparser", "lodash/object", "lodash/lang", "./actions.js", "./pageUtils.js", "./router.js"], factory);
	else if(typeof exports === 'object')
		exports["Server.js"] = factory(require("@r/middleware"), require("redux"), require("./navigationMiddleware.js"), require("./reducer.js"), require("koa"), require("koa-router"), require("koa-bodyparser"), require("lodash/object"), require("lodash/lang"), require("./actions.js"), require("./pageUtils.js"), require("./router.js"));
	else
		root["Server.js"] = factory(root["@r/middleware"], root["redux"], root["./navigationMiddleware.js"], root["./reducer.js"], root["koa"], root["koa-router"], root["koa-bodyparser"], root["lodash/object"], root["lodash/lang"], root["./actions.js"], root["./pageUtils.js"], root["./router.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__) {
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

	var _middleware = __webpack_require__(1);

	var _koa = __webpack_require__(8);

	var _koa2 = _interopRequireDefault(_koa);

	var _koaRouter = __webpack_require__(9);

	var _koaRouter2 = _interopRequireDefault(_koaRouter);

	var _koaBodyparser = __webpack_require__(10);

	var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

	var _redux = __webpack_require__(4);

	var _object = __webpack_require__(11);

	var _lang = __webpack_require__(12);

	var _navigationMiddleware = __webpack_require__(6);

	var _navigationMiddleware2 = _interopRequireDefault(_navigationMiddleware);

	var _reducer = __webpack_require__(7);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _actions = __webpack_require__(13);

	var _actions2 = _interopRequireDefault(_actions);

	var _pageUtils = __webpack_require__(14);

	var _router = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	exports.default = function (config) {
	  var _config$port = config.port;
	  var port = _config$port === undefined ? 8888 : _config$port;
	  var _config$preRouteServe = config.preRouteServerMiddleware;
	  var preRouteServerMiddleware = _config$preRouteServe === undefined ? [] : _config$preRouteServe;
	  var _config$postRouteServ = config.postRouteServerMiddleware;
	  var postRouteServerMiddleware = _config$postRouteServ === undefined ? [] : _config$postRouteServ;
	  var _config$reduxMiddlewa = config.reduxMiddleware;
	  var reduxMiddleware = _config$reduxMiddlewa === undefined ? [] : _config$reduxMiddlewa;
	  var _config$reducers = config.reducers;
	  var reducers = _config$reducers === undefined ? {} : _config$reducers;
	  var _config$routes = config.routes;
	  var routes = _config$routes === undefined ? [] : _config$routes;
	  var _config$getServerRout = config.getServerRouter;
	  var getServerRouter = _config$getServerRout === undefined ? function () {} : _config$getServerRout;
	  var _config$template = config.template;
	  var template = _config$template === undefined ? function () {} : _config$template;
	  var _config$dispatchBefor = config.dispatchBeforeNavigation;
	  var dispatchBeforeNavigation = _config$dispatchBefor === undefined ? _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, undefined);
	  })) : _config$dispatchBefor;


	  var server = new _koa2.default();
	  var bodyparser = (0, _koaBodyparser2.default)();
	  var router = new _koaRouter2.default();

	  var handleRoute = function () {
	    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx) {
	      var nav, well, thunk, r, store, state, currentUrl, currentQuery, newUrl;
	      return regeneratorRuntime.wrap(function _callee2$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              nav = _navigationMiddleware2.default.create(routes);
	              well = _middleware.PromiseWell.create();
	              thunk = _middleware.Thunker.create();
	              r = (0, _redux.combineReducers)(_extends({}, reducers, { platform: _reducer2.default }));
	              store = (0, _redux.createStore)(r, {}, _redux.applyMiddleware.apply(undefined, _toConsumableArray(reduxMiddleware).concat([nav, thunk, well.middleware])));


	              store.dispatch(function () {
	                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dispatch, getState, utils) {
	                  return regeneratorRuntime.wrap(function _callee$(_context) {
	                    while (1) {
	                      switch (_context.prev = _context.next) {
	                        case 0:
	                          _context.next = 2;
	                          return dispatchBeforeNavigation(ctx, dispatch, getState, utils);

	                        case 2:
	                        case 'end':
	                          return _context.stop();
	                      }
	                    }
	                  }, _callee, undefined);
	                }));

	                return function (_x2, _x3, _x4) {
	                  return _ref2.apply(this, arguments);
	                };
	              }());

	              store.dispatch(_actions2.default.navigateToUrl(ctx.request.method.toLowerCase(), ctx.path, {
	                queryParams: ctx.request.query,
	                bodyParams: ctx.request.body,
	                referrer: ctx.headers.referer
	              }));

	              _context2.next = 9;
	              return well.onComplete();

	            case 9:
	              state = store.getState();

	              // check for redirects

	              currentUrl = state.platform.currentPage.url;
	              currentQuery = state.platform.currentPage.queryParams;


	              if (!(0, _lang.isEqual)(currentUrl, ctx.path) || !(0, _lang.isEqual)(currentQuery, ctx.request.query)) {
	                if (currentUrl) {
	                  newUrl = currentUrl;

	                  if (!(0, _lang.isEmpty)(currentQuery)) {
	                    newUrl += (0, _pageUtils.createQuery)(currentQuery);
	                  }
	                  ctx.redirect(newUrl);
	                } else {
	                  ctx.redirect('/');
	                }
	              } else {
	                ctx.body = template(state, store);
	              }

	            case 13:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee2, undefined);
	    }));

	    return function handleRoute(_x) {
	      return _ref.apply(this, arguments);
	    };
	  }();

	  // set up server routes before setting up shared routes
	  getServerRouter(router);

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
	        for (var _iterator2 = (0, _object.values)(_router.METHODS)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

	    // hook up all the middleware to the koa instance
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

	  preRouteServerMiddleware.forEach(function (m) {
	    return server.use(m);
	  });
	  server.use(bodyparser);
	  server.use(router.routes());
	  server.use(router.allowedMethods());
	  postRouteServerMiddleware.forEach(function (m) {
	    return server.use(m);
	  });

	  return function () {
	    server.listen(port, function () {
	      console.log('App launching on port ' + port);
	    });
	  };
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("@r/middleware");

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("koa");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("koa-router");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("koa-bodyparser");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("lodash/object");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("lodash/lang");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }
/******/ ])
});
;