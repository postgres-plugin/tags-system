var Hoek = require('hoek');
var server = require('./server.js');

server.start(function (err) {
  Hoek.assert(!err, 'error starting server');
  console.log('Server running at port: ', server.info.uri);
});
