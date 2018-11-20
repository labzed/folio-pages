const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');

module.exports = {
  mode: 'development',
  entry: {
    launcher: './src/launcher.js',
    invoice: './src/templates/invoice.js',
    proposal: './src/templates/proposal.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'invoice.html',
      chunks: ['invoice']
    }),
    new HtmlWebpackPlugin({
      filename: 'proposal.html',
      chunks: ['proposal']
    }),
    new HtmlWebpackRootPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
