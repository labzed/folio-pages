const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');

module.exports = {
  mode: 'development',
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                require.resolve('@babel/preset-env'),
                {
                  useBuiltIns: 'usage'
                }
              ],
              require.resolve('@babel/preset-react')
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
