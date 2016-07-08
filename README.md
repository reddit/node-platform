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
  reducers={},                            // Reducers for the Redux store.

  routes=[],                              // A list of lists that maps
                                          // routes to handlers. For example:
                                          //
                                          // [
                                          //   ['/', Frontpage],
                                          //   ['/r/:subredditName', Subreddit],
                                          // ]

  template=function(data) {...},          // a template function that returns a
                                          // string (likely an HTML string).

  port=8888,                              // OPTIONAL. port for your server.

  preRouteServerMiddleware=[],            // OPTIONAL. Koa middleware to run
                                          // before a route is handled

  postRouteServerMiddleware=[],           // OPTIONAL. Koa middleware to run
                                          // after a route is handled

  reduxMiddleware=[],                     // OPTIONAL. Additional Redux
                                          // middleware. Middleware defined here
                                          // will run before r/platform's
                                          // middleware runs.

  dispatchBeforeNavigation=async (koaCtx, dispatch, getState, utils) => {},
                                          // OPTIONAL. Dispatch additional
                                          // actions before the navigation
                                          // fires.

  getServerRouter=(router) => {},         // OPTIONAL. Return the Koa router if
                                          // needed.
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

  dataVar='___r',                 // OPTIONAL. A key on the 'window' object
                                  // where the data will be written into.

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
import * as otherActions from './otherActions';

// Create a handler
class Frontpage extends BaseHandler {  
  async [METHODS.GET](dispatch, getState, { waitForState, waitForAction }) {
    // pull out params if necessary
    const { foo } = this.queryParams;

    // dispatch certain actions synchronously
    dispatch(otherActions.doSomething());

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

## Rendering pages
Often, you would like to render certain components based on the url state. To do so, you can use the `<UrlSwitch>` component:

```es6
import React from 'react';
import { UrlSwitch, Case, Page } from '@r/platform/url';

export default class Foo extends React.Component {
  render() {
    return (
      <div>
        <UrlSwitch>
          <Case
            // do something based on a url. this is the most generic way to use
            // urlSwitch
            url='/'
            exec={ pageData => <div/> }
          />
          <Page
            // as a convenience, if a specific component needs to be rendered,
            // use the <Page/> component instead. this takes a 'component'
            // instead of a function. the props of the component are pageData
            url='/r/:subredditName'
            component={ FooComponent }
          />
          <Case
            url='*' // catch all
            exec={ pageData => <div/> }
          />
        </UrlSwitch>
      </div>
    );
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

@r/platform also includes a `<BackAnchor/>` component. The `<BackAnchor/>` checks to see if the linked url is the previous url in history. If it is, it calls `history.back()` (if the history API exists) instead of adding the destination to the browser's history. This makes links that say 'back' actually go back.

If those don't suite your needs, @r/platform also provides `<LinkHijacker />`. Helpful for when you need to use `dangerouslySetInnerHTML`, this component will ensure clicking on links will navigate without a new page load. It follows relative links by default, and can be customized via a RegExp api to extract paths from arbitrary urls.

```es6
import React from 'react';
import { LinkHijacker } from '@r/platform/components';

export default class Foo extends React.Component {
  render() {
    return (
      <div className='Foo'>
        <LinkHijacker>
          <div
            className='Foo__content'
            dangerouslySetInnerHTML={ { __html: this.props.htmlContent } }
          />
        </LinkHijacker>
      </div>
    );
  }
}
```

@r/platform exports a pre-connected form as well:

```es6
import React from 'react';
import { Form } from '@r/platform/components';

export default class Foo extends React.Component {
  render() {
    return (
      <div className='Foo'>
        <Form
          action='/login'
          className='Foo__form'
        >
          <input name='username'/>
          <input name='password' type='password'/>
        </Form>
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

`merge` can also take options which let the method know how to deal with arrays and empty dictionaries.

`merge(state, diff, options={ emptyDict, array })`

0. `emptyDict`: One of `strict`, `skip`, or `replace`. Defaults to `strict`. `strict` will merge in the new dictionary, which will cause the object reference to change. `skip` will ignore empty dictionaries (thus not changing the object reference in the original). `replace` will swap out the old dictionary with the empty one.

0. `array`: One of `replace` or `concat`. Defaults to `replace`. `replace` will swap out the old array with the new one. `concat` will produce a new array with values from both arrays, with values from the original taking precedence.

**plugins**

You may wish to quickly render a shell of the page- such as a loading screen-
and make API requests on the client, rather than the server.

```es6
import * as plugins from '@r/platform/plugins';
import Server from '@r/platform/Server';

const server = Server({
  //...
  dispatchBeforeNavigation: async (ctx, dispatch, getState, utils) => {
    //...
    plugins.dispatchInitialShell(ctx, dispatch);
  }
});
```

This will set state.shell to `true` or `false`. If you have a `nojs` cookie, a
`nojs` querystring, or your user-agent contains the word `bot`, state.shell
will be `false` during server request handling. Otherwise, it will be `true`.
You can then check `state.shell` in your _handlers_ to determine whether or not
to make API requests.

You will also likely want to run `actions.activateClient` on the client side to
ensure the navigation actions are re-fired client side, with `shell` set to
`false`. (Otherwise, activateClient is unnecessary unless you need to re-run
navigation handlers for some reason.)

```es6
import * as actions from '@r/platform/actions';
import Client from '@r/platform/Client';

const client = Client({ /* ... */ });
client.dispatch(actions.activateClient);
```


## Testing
r/platform provides some hooks to make it easier to create tests. Primarily, it exports a test creator that lets you easily set up a test for a component:

`createTest([storeOptions,] testFn)`

`storeOptions` are optional and are used to make the store more representative of the actual store the component is wrapped with. It has three optional keys on it:

0. `reducers: object`: A dictionary of any reducers the store should contain
0. `middleware: array`: A list of middleware to be added to the store
0. `routes: array`: A routes list

The `testFn` is called with a dictionary of helpers: `{ shallow, mount, render, expect, getStore, sinon }`.

0. `shallow: function`: Shallow renders your React components. Good for testing the rendering of the component and checking that certain elements exist within in. [more info](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md)
0. `mount: function`: Mounts the component on a jsdom document. Use this to test interactions like clicking, hover, etc. [more info](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md)
0. `render: function`: Renders to static html. [more info](https://github.com/airbnb/enzyme/blob/master/docs/api/render.md)
0. `expect: function`: Assertion function.
0. `getStore: function`: Returns a store and a wrapper. Useful to testing components that depend on redux.
0. `sinon: object`: The entirety of sinon to help generate spies, stubs, and mocks. [more info](http://sinonjs.org/)

### Using createTest
```es6
import createTest from '@r/platform/createTest';
import Foo from './Foo';

// testing with a connected component
createTest(({ mount, getStore, expect }) => {
  describe('<Foo/>', () => {
    it('should change state when clicked', () => {
      const { store, StoreWrapper } = getStore();
      const container = mount(
        <StoreWrapper>
          <Foo/>
        </StoreWrapper>
      );

      container.find(Foo).simulate('click');
      expect(store.getState().fooValue).to.equal('foo');
    });
  });
});
```
