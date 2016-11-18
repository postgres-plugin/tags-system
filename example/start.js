'use strict';

var Hoek = require('hoek');
var init = require('./server.js');
var config = require('../config/load-config.js');

init(config, function (err, server) {
  Hoek.assert(!err, err);
  process.stdout.write('server listening on port ' + server.info.uri + '\n');

  return server.start(function (errorStart) {
    Hoek.assert(!errorStart, 'error starting the server');
  });
});
