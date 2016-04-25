Contributing to node-platform
=============================

So you want to contribute to node-platform? Fantastic! Here's a brief overview on
how best to do so.

## What to change

Here's some examples of things you might want to make a pull request for:

* New features
* Bugfixes
* Inefficient blocks of code

If you have a more deeply-rooted problem with how the program is built or some
of the stylistic decisions made in the code, it's best to
[create an issue](https://github.com/reddit/node-platform/issues) before putting
the effort into a pull request. The same goes for new features - it is
best to check the project's direction, existing pull requests, and currently open
and closed issues first.

## Style

* Two spaces, not tabs
* Semicolons are not optional
* All pages should render on the server and the client. The site should be
  usable without javascript.
* Review our [style guide](https://github.com/reddit/tree/master/javascript) for
  more information.

Look at existing code to get a good feel for the patterns we use. Please run
tests before submitting any pull requests. Instructions for running tests can
be found in the README.

## Using Git appropriately

1. [Fork the repository](https://github.com/reddit/node-platform/fork_select) to
  your Github account.
2. Create a *topical branch* - a branch whose name is succint but explains what
  you're doing, such as "change-orangered-to-periwinkle"
3. Make your changes, committing at logical breaks.
4. Push your branch to your personal account
5. [Create a pull request](https://help.github.com/articles/using-pull-requests)
6. Watch for comments or acceptance

Please make separate branches for unrelated changes!

## Licensing

node-platform is MIT licensed. See details in the LICENSE file. This is a very permissive
scheme, GPL-compatible but without many of the restrictions of GPL.
