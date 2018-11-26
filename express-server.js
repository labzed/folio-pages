const express = require('express');
const middleware = require('./middleware');
const app = express();

module.exports = async function start({ rootDirectory, publicPath }) {
  if (!publicPath) {
    throw new Error('express server needs a publicPath option');
  }

  app.use(await middleware({ rootDirectory, publicPath }));

  // 404 handler supposedly
  app.get((req, res, next) => {
    res
      .type('text')
      .status(404)
      .send('not found');
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res
      .status(500)
      .type('text')
      .send(err.stack);
  });

  const port = 8080;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};
