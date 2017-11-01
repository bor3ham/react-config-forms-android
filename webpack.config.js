var path = require('path');
var NodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/renderer.js',
  output: {
    path: __dirname + '/dist',
    filename: 'react-config-forms-android.js',
    library: 'react-config-forms-android',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
        },
      },
    ],
  },
  externals: NodeExternals(),
};
