// script to enable webpack-bundle-analyzer
process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackConfigProd = require('react-scripts/config/webpack.config')(
  'production'
);

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());
webpackConfigProd.plugins.push(
  new ProgressBarPlugin({
    format: `analyzing... [:bar] [:percent] [:elapsed seconds] - :msg`,
  })
);

// actually running compilation and waiting for plugin to start explorer
webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});