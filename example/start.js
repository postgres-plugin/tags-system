'use strict';

var Hoek = require('hoek');
var init = require('./server.js').init;


init(process.env.PORT || 3000, function (err, server) {
  Hoek.assert(!err, err);
  process.stdout.write('server listening on port ' + server.info.uri + '\n');
});
