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
To set up a server
```es6
import Server from '@r/platform/Server';

const server = Server({
  reducers={},                    // Reducers for the Redux store.

  routes=[],                      // A list of touples that maps routes to handlers.
                                  // For example:
                                  // [
                                  //   ['/', Frontpage],
                                  //   ['/r/:subredditName', Subreddit],
                                  // ]

  template=function(data) {...},  // a template function that returns a string
                                  // (likely an HTML string).

  port=8888,                      // OPTIONAL. port for your server.

  preRouteServerMiddleware=[],    // OPTIONAL. Koa middleware to run before a route is handled

  postRouteServerMiddleware=[],   // OPTIONAL. Koa middleware to run after a route is handled

  reduxMiddleware=[],             // OPTIONAL. Additional Redux middleware.
                                  // Middleware defined here will run before r/platform's middleware runs.
});

// start the server
server();
```

To set up the client
```es6
import Client from '@r/platform/Client';

const client = Client({
  reducers={},                    // Reducers for the Redux store.

  routes=[],                      // A list of touples that maps routes to handlers.
                                  // For example:
                                  // [
                                  //   ['/', Frontpage],
                                  //   ['/r/:subredditName', Subreddit],
                                  // ]

  appComponent=<div/>             // The React component that represents the app.

  container='container',          // OPTIONAL. Id of the DOM element the Client App will be rendered into.

  dataEl='data',                  // OPTIONAL. Id of the script tab that holds the JSON blob the store is
                                  // initialized with.

  modifyData=function(data) {...} // OPTIONAL. A function that mutates the data object before it is loaded
                                  // into the client side store.

  reduxMiddleware=[],             // OPTIONAL. Additional Redux middleware.
                                  // Middleware defined here will run before r/platform's middleware runs.

  debug=false,                    // OPTIONAL. Setting debug to true will cause redux actions to be logged
                                  // in the console.
});

// run the client
client();
```
