var webpack = require("webpack");
var argv = require("yargs").argv;
var notifier = require("node-notifier");
var path = require("path");
var fs = require('fs');
var _ = require('lodash');

var SUB_MODULES = fs.readdirSync('lib/modules')
  .reduce(function(prev, modName) {
    var modules = _.extend({}, prev);
    modules[modName.replace('.js', '')] = './lib/modules/' + modName;
    return modules;
  }, {});

var SUB_MODULE_EXTERNALS = fs.readdirSync('lib/modules')
  .reduce(function(prev, modName) {
    var modules = _.extend({}, prev);
    modules['./modules/' + modName.replace('.js', '')] = './' + modName;
    modules['./' + modName.replace('.js', '')] = './' + modName;
    return modules;
  }, {});

var compiler = webpack({
  entry: _.extend({
    platform: './lib/platform.js',
  }, SUB_MODULES),
  output: {
    path: path.join(__dirname),
    filename: "[name].js",
    library: "[name].js",
    libraryTarget: "commonjs",
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'stage-2',
            'react',
          ],
          plugins: [
            'transform-class-properties',
          ],
        },
      },
    ],
  },
  externals: _.extend({
    'koa': 'commonjs koa',
    'koa-bodyparser': 'commonjs koa-bodyparser',
    'koa-router': 'commonjs koa-router',
    'koa-static': 'commonjs koa-static',
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom',
    'react-redux': 'commonjs react-redux',
    'redux': 'commonjs redux',
    'reselect': 'commonjs reselect',
    'lodash/object': 'commonjs lodash/object',
    'path-to-regexp': 'commonjs path-to-regexp',
    '@r/middleware': 'commonjs @r/middleware',
  }, SUB_MODULE_EXTERNALS),
});

function formatAsset(asset) {
  var name = asset.name;
  var size = asset.size;
  var sizeStr = size + " B";

  if (size > 1000) sizeStr = Math.ceil(size / 1000) + " kB";
  if (size > 1000000) sizeStr = Math.ceil(size / 1000000) + " MB";

  return name + " [" + sizeStr + "]";
}

if (argv.watch) {
  compiler.watch({}, (err, stats) => {
    if (!err) {
      console.log(stats.toString({
        colors: true,
        chunks: false,
        version: false,
      }));

      var s = stats.toJson();

      if (s.errors && s.errors.length) {
        notifier.notify({
          "title": "ERROR!",
          "message": "Check the console for errors",
        });
      } else {
        notifier.notify({
          "title": "Build complete",
          "message": s.assets.map(formatAsset).join("\n"),
        });
      }
    }
  });
} else {
  compiler.run(function(err, stats) {
    console.log(stats.toString({
      colors: false,
      chunks: false,
      version: false,
    }));
  });
}
