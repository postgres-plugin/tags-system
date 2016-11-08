'use strict';

var pg = require('pg');

function register (server, options, next) {
  server.app.tagsPool = new pg.Pool();

  // server.decorate('server', 'db', function (cb) {
  //   server.app.pool.connect(cb);
  // });

  return next();
}

register.attributes = {
  name: 'tags',
  version: '1.0.0'
};

module.exports = register;
