# r/platform
A set of tools to enable easy universal rendering and page navigation on a React + Redux stack.

## Installation
Currently, just use NPM.
```
npm install -S @r/platform
```

You also need to install its peer dependencies. For example:
```
npm install koa@2.0.0 koa-bodyparser@3.0.0 koa-router@7.0.1 koa-static@3.0.0 react@15.0.1 react-redux@4.4.5 react-dom@15.0.0-rc.2 redux@3.4.0 reselect@2.4.0 lodash@4.11.1 @r/middleware@0.5.1
```

## Usage
### Server
```es6
// Server.es6.js
import Server from '@r/platform/Server';

const server = Server({
  reducers={},                    // Reducers for the Redux store.

  routes=[],                      // A list of lists that maps
                                  // routes to handlers. For example:
                                  //
                                  // [
                                  //   ['/', Frontpage],
                                  //   ['/r/:subredditName', Subreddit],
                                  // ]

  template=function(data) {...},  // a template function that returns a
                                  // string (likely an HTML string).

  port=8888,                      // OPTIONAL. port for your server.

  preRouteServerMiddleware=[],    // OPTIONAL. Koa middleware to run
                                  // before a route is handled

  postRouteServerMiddleware=[],   // OPTIONAL. Koa middleware to run
                                  // after a route is handled

  reduxMiddleware=[],             // OPTIONAL. Additional Redux middleware.
                                  // Middleware defined here will run
                                  // before r/platform's middleware runs.
});

// start the server
server();
```

### Client
```es6
// Client.es6.js
import Client from '@r/platform/Client';

const client = Client({
  reducers={},                    // Reducers for the Redux store.

  routes=[],                      // A list of lists that maps
                                  // routes to handlers. For example:
                                  //
                                  // [
                                  //   ['/', Frontpage],
                                  //   ['/r/:subredditName', Subreddit],
                                  // ]

  appComponent=<div/>             // The React component that
                                  // represents the app.

  container='container',          // OPTIONAL. Id of the DOM element
                                  // the Client App will be rendered into.

  dataEl='data',                  // OPTIONAL. Id of the script tab that
                                  // holds the JSON blob the store is
                                  // initialized with.

  modifyData=function(data) {...} // OPTIONAL. A function that mutates the
                                  // data object before it is loaded
                                  // into the client side store.

  reduxMiddleware=[],             // OPTIONAL. Additional Redux middleware.
                                  // Middleware defined here will run
                                  // before r/platform's middleware runs.

  debug=false,                    // OPTIONAL. Setting debug to true will
                                  // cause redux actions to be logged
                                  // in the console.
});

// run the client
client();
```

## Creating Routes
r/platform's router differs from most traditional routers. Instead of handlers returning html, they use Redux's dispatch calls to help define a state blob. Methods on the handler are HTTP verbs. Specifically, they are one of `get`, `post`, `put`, `patch`, and `delete`. These methods MUST return promises. The easiest way to enforce this is to declare the methods as es7 async functions.

All methods have access to the following properties:

0. `this.originalUrl`: the url that spawned this handler
0. `this.urlParams`: a dictionary of route defined params. e.g. if '/bar' matches '/:foo', urlParams would look like `{ foo: 'bar' }`.
0. `this.queryParams`: a dictionary of query params
0. `this.hashParams`: a dictionary of hash params
0. `this.bodyParams`: a dictionary of data that would appear in the request body

Each method is also called with the following arguments:

0. `dispatch`: a function used to dispatch Redux actions
0. `getState`: a function that (when called) returns a snapshot of state in the Redux store
0. `utils`: a dictionary of helper methods. Currently contains two methods, `waitForState` and `waitForAction`. Visit [r/middleware](https://github.com/nramadas/r-middleware) for more details on how these operate.

### Example
```es6
// routes.es6.js
import { BaseHandler, METHODS } from '@r/platform/router';
import * as actions from '@r/platform/actions';

// Create a handler
class Frontpage extends BaseHandler {  
  async [METHODS.GET](dispatch, getState, { waitForState, waitForAction }) {
    // pull out params if necessary
    const { foo } = this.queryParams;

    // dispatch certain actions synchronously
    // use helper method this.setPage(pageType) – this pushes a new page onto
    // the history stack
    this.setPage('%%frontpage');

    // if needed, wait on certain tasks to complete before dispatching further.
    // on the Server side, the Server will wait for the entire function to
    // complete before responding to the request with html.
    const importantThing = await importantAsyncFunction();

    // use the utility methods to wait on something in state
    await waitForState(
      state => state.foo === 'foo', // the condition
      state => dispatch(/* something */) // the callback if condition is met
    );

    // further synchronous dispatches are possible. Thanks to es6/7, these won't
    // fire until the previous asynchronous action has completed.
    dispatch(/* something else */);
  }
}

// Export the routes
export default [
  ['/', Frontpage],
];
```

## Keeping the Url in Sync
In addition to routing, it is important that the url is kept in sync with the store state. It is also important that when a popstate event is fired, the state updates to reflect. To that effect, r/platform exports a React component that manages the url. To use it, just drop the component into your app anywhere it won't get unmounted.

```es6
import React from 'react';
import { UrlSync } from '@r/platform/components';

export default class App extends React.Component {
  render() {
    return (
      <div>
        {/* many components */}
        <UrlSync/>
      </div>
    )
  }
}
```
## Easy routing
Sometimes, routing to a page might happen by clicking an anchor tag. Instead of manually connecting the anchor tag to a dispatch action, @r/platform exports a pre-connected anchor tag component:

```es6
import React from 'react';
import { Anchor } from '@r/platform/components';

export default class Foo extends React.Component {
  render() {
    return (
      <div className='Foo'>
        <Anchor
          href='/foo?stuff=yeah'
          className='Foo__anchor'
        >
          Click me!
        </Anchor>
      </div>
    );
  }
}
```

## Additional Tools
There are a few additional goodies in r/platform

**Reducer**

r/platform exports a Redux reducer (`@r/platform/reducer`). This reducer gets auto added when using the `Client` and `Server` functions, so you should never need to import this directly.

**Actions**

r/platform exposes a few Redux actions you can use to navigate through the app. They are:

0. `setPage(pageType, url, { urlParams, queryParams, hashParams })`: pushes a new page onto the navigation stack. Note: there are no bodyParams represented here, as routes that contain a body should not update the url.
0. `gotoPageIndex(pageIndex)`: navigates to a particular page on the navigation stack.
0. `navigateToUrl(method, pathName, { queryParams, hashParams, bodyParams })`: navigate to a url. Note: there is no need to independently include the urlParams here. Simply pass along the url.

**Router**

r/platform doesn't use a traditional router. So instead, the router exports a Handler and some http verbs.
```es6
import { BaseHandler, METHODS } from '@r/platform/router';

console.log(METHODS); // {
                      //   GET: 'get',
                      //   POST: 'post',
                      //   PUT: 'put',
                      //   PATCH: 'patch',
                      //   DELETE: 'delete',
                      // }

console.log(BaseHandler); // Described in the previous section on creating routes.
```

**merge**

r/platform includes a helpful utility method for "modifying" state while maintaining the immutability that Redux expects.
```es6
import merge from '@r/platform/merge';
import * as actions from '@r/platform/actions';

// reducer
export default function(state={}, action={}) {
  switch(action.type) {
    case actions.GOTO_PAGE_INDEX: {
      const { pageIndex } = action.payload;

      // `merge` lets you just deal with state diffs. just merge your
      // diff with state and `merge` will preserve immutability.
      return merge(state, {
        currentPageIndex: pageIndex,
        currentPage: state.history[pageIndex],
      });
    }
    default: return state;
  }
}

```
