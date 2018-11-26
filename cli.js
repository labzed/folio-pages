#!/usr/bin/env node
const build = require('./build');
const server = require('./server');
const server2 = require('./express-server');
const mode = (process.argv[2] || '').trim().toLowerCase();

switch (mode) {
  case 'build':
    // NOTE
    // The webpack output.publicPath will not affect where the html files are output.
    // It only affects the prefix on the assets paths inside the html file.
    // But, in dev server and dev middleware, there is a devServer.publicPath which
    // is used by the server to serve the html files (and assets) on that path.
    build({ publicPath: '/foonzo' }).catch(error => {
      console.error(error);
      process.exit(1);
    });
    break;

  case 'serve':
    server({ publicPath: '/fooboo' });
    break;

  case 'serve2':
    server2({ publicPath: '/foonzo' });
    break;

  default:
    console.log('build or serve');
    break;
}
