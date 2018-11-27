#!/usr/bin/env node
const build = require('./build');
const server = require('./server');
const server2 = require('./express-server');
const meow = require('meow');

const cli = meow({
  flags: {
    publicPath: {
      type: 'string',
      alias: 'p'
    },
    rootDirectory: {
      type: 'string',
      alias: 'd'
    }
  }
});

const mode = (cli.input[0] || '').trim().toLowerCase();

switch (mode) {
  case 'build':
    // NOTE
    // The webpack output.publicPath will not affect where the html files are output.
    // It only affects the prefix on the assets paths inside the html file.
    // But, in dev server and dev middleware, there is a devServer.publicPath which
    // is used by the server to serve the html files (and assets) on that path.
    build(cli.flags).catch(error => {
      console.error(error);
      process.exit(1);
    });
    break;

  case 'serve':
    server(cli.flags);
    break;

  case 'serve2':
    server2(cli.flags);
    break;

  default:
    console.log('Usage: "folio-pages build" or "folio-pages serve"');
    break;
}
