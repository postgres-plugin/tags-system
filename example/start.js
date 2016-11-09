'use strict';

var Hoek = require('hoek');
var init = require('./server.js');


init(process.env.PORT || 3000, undefined, function (err, server) { // eslint-disable-line
  Hoek.assert(!err, err);

  server.start();
  process.stdout.write('server listening on port ' + server.info.uri + '\n');
});
