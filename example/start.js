'use strict';

var Hoek = require('hoek');
var init = require('./server.js');
var config = require('../config/load-config.js');

init(process.env.PORT || 3000, config, function (err, server) {
  Hoek.assert(!err, err);
  process.stdout.write('server listening on port ' + server.info.uri + '\n');
});
