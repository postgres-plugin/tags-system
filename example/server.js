var Hapi = require('hapi');
var Hoek = require('hoek');
var tags = require('../lib/index.js');

var server = new Hapi.Server();

server.connection({port: process.env.PORT || 3000});

server.register(tags, function (err) {
  Hoek.assert(!err, 'error registering plugin');
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply(request.jackmisawesome);
  }
});

module.exports = server;
