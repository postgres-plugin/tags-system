'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();
var Hoek = require('hoek');
var tags = require('../');

server.connection({ port: process.env.PORT || 3000 });

server.register(tags, function (err) {
  Hoek.assert(!err, 'error registering plugin');
});

server.start(function (err) {
  Hoek.assert(!err, 'error starting server');
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply(request.jackmisawesome);
  }
});
