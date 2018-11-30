const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const babelPresetEnv = require.resolve('@babel/preset-env');
const babelPresetReact = require.resolve('@babel/preset-react');

console.log({
  babelPresetEnv, babelPresetReact
});

module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              require.resolve('@babel/plugin-proposal-class-properties')
            ],
            presets: [
              [
                babelPresetEnv,
                {
                  useBuiltIns: 'usage'
                }
              ],
              babelPresetReact
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  // plugins:
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // }
};
