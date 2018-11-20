const generateWebpackConfig = require('./generate-webpack-config');
const webpack = require('webpack');

module.exports = async function build(rootDirectory) {
  const webpackConfig = await generateWebpackConfig(rootDirectory);

  return new Promise((resolve, reject) =>
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject({ error, stats });
      } else {
        resolve({ stats });
      }
    })
  );
};
