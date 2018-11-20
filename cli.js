#!/usr/bin/env node
const build = require('./build');
const server = require('./server');

const mode = (process.argv[2] || '').trim().toLowerCase();

switch (mode) {
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
