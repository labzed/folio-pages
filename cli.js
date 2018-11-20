#!/usr/bin/env node
const build = require('./build');
const server = require('./server');
console.log('arg', process.argv[1]);

switch (process.argv[1]) {
  case 'build':
    build().catch(error => {
      console.error(error);
      process.exit(1);
    });
    break;

  case 'serve':
    server();
    break;

  default:
    console.log('build or serve');
    break;
}
