const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
//const webpackConfig = require('./webpack.config');
const generateWebpackConfig = require('./generate-webpack-config');

module.exports = async function server(rootDirectory) {
  const webpackConfig = await generateWebpackConfig(rootDirectory);
  const compiler = webpack(webpackConfig);
  const devServerOptions = {
    stats: {
      colors: true
    }
  };

  const server = new WebpackDevServer(compiler, devServerOptions);

  return new Promise((resolve, reject) => {
    server.listen(8080, '127.0.0.1', () => {
      console.log('Starting server on http://localhost:8080');
      resolve();
    });
  });
};
