'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var server = new Hapi.Server();
var path = require('path');

require('env2')(path.resolve(__dirname, '.env'));
var HapiPostgresConnection = require('hapi-postgres-connection'); // eslint-disable-line
var tags = require('../lib/index.js'); // eslint-disable-line


server.connection({ port: process.env.PORT || 3000 });

server.register([
  HapiPostgresConnection,
  { register: tags, options: { hpc: HapiPostgresConnection } }
], function (err) {
  Hoek.assert(!err, 'error registering plugin');
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    console.log('in handler');
    reply('hello');
  }
});

module.exports = server;
