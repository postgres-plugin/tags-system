'use strict';

var Hoek = require('hoek');
var init = require('./server.js');

var config = {
  user: 'postgres',
  database: 'tags',
  password: '',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

init(process.env.PORT || 3000, config, function (err, server) { // eslint-disable-line
  Hoek.assert(!err, err);

  server.start();
  process.stdout.write('server listening on port ' + server.info.uri + '\n');
});
