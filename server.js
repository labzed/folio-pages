const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const ErrorOverlayWebpackPlugin = require('error-overlay-webpack-plugin');
const generateWebpackConfig = require('./generate-webpack-config');
const path = require('path');

module.exports = async function server({ rootDirectory, publicPath }) {
  rootDirectory = rootDirectory || process.cwd();
  const webpackConfig = await generateWebpackConfig({
    rootDirectory,
    publicPath
  });

  const devServerOptions = {
    publicPath,
    host: 'localhost',
    port: '8080',
    contentBase: false,
    hot: true,
    overlay: true,
    stats: {
      colors: true
    }
  };

  webpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);
  webpackConfig.forEach(config => {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    // config.plugins.push(new ErrorOverlayWebpackPlugin());
  });
  console.log(webpackConfig);

  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, devServerOptions);

  return new Promise((resolve, reject) => {
    server.listen(8080, '127.0.0.1', () => {
      console.log('Starting server on http://localhost:8080');
      resolve();
    });
  });
};
