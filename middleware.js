const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const generateWebpackConfig = require('./generate-webpack-config');

module.exports = async function middleware({ publicPath, rootDirectory }) {
  rootDirectory = rootDirectory || process.cwd();
  console.log('rootDirectory provided as', rootDirectory);
  const webpackConfig = await generateWebpackConfig({
    rootDirectory,
    publicPath
  });

  const devServerOptions = {
    publicPath,
    // host: 'localhost',
    // port: '8080',
    contentBase: false,
    hot: true,
    overlay: true,
    stats: {
      colors: true
    }
  };

  // TODO: add dev server entrypoints
  // webpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

  // webpackConfig.forEach(config => {
  // config.plugins.push(new webpack.HotModuleReplacementPlugin());
  // config.plugins.push(new ErrorOverlayWebpackPlugin());
  // });

  const compiler = webpack(webpackConfig);
  return webpackDevMiddleware(compiler, devServerOptions);
};
