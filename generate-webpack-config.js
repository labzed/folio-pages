const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const globby = require('globby');
const path = require('path');
const clone = require('clone');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

function createWebpackConfig(
  name,
  documentSourcePath,
  outputDirectory,
  rootDirectory
) {
  const config = clone(webpackConfig);

  // config.entry = documentSourcePath;
  config.entry = path.resolve(__dirname, 'src/launcher.js');
  config.output = {
    filename: name + '.bundle.js',
    path: outputDirectory,
    publicPath: '/'
  };
  config.plugins = [
    new HtmlWebpackPlugin({
      filename: name + '.html'
      // inlineSource: '.(js|css)$'
    }),
    // new HtmlWebpackInlineSourcePlugin(),
    new HtmlWebpackRootPlugin()
  ];

  config.resolve = {
    alias: {
      'the-current-document': documentSourcePath
    },
    // The following allows to load modules such as React from the parent package.
    // TODO: consider an alternative lookup to avoid relying on CWD.
    modules: [
      path.join(rootDirectory, 'node_modules'),
      path.join(__dirname, 'node_modules')
    ]
  };

  return config;
}

async function getAllEntries(templatesDirectory) {
  const files = await globby('*.js', { cwd: templatesDirectory });
  files.forEach(f => console.log('-> ', f));
  const entries = {};
  files.forEach(filename => {
    const entryName = path.basename(filename, '.js');
    entries[entryName] = path.join(templatesDirectory, filename);
  });
  return files.map(filename => {
    return {
      name: path.basename(filename, '.js'),
      source: path.join(templatesDirectory, filename)
    };
  });
  return entries;
}

module.exports = async function createWebpackConfigList(rootDirectory) {
  if (!rootDirectory) {
    rootDirectory = process.cwd();
  }

  const templatesDirectory = path.join(rootDirectory, 'templates');
  const outputDirectory = path.join(rootDirectory, 'build');
  console.log('Looking for templates in:', templatesDirectory);
  const entries = await getAllEntries(templatesDirectory);
  const webpackConfigList = entries.map(e =>
    createWebpackConfig(e.name, e.source, outputDirectory, rootDirectory)
  );
  return webpackConfigList;
};
