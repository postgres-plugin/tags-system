'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var fs = require('fs');
var tags = require('../lib/index.js');
var tagsData = JSON.parse(fs.readFileSync('./example/tags.json').toString());
var server = new Hapi.Server();

server.connection({ port: process.env.PORT || 3000 });

server.register([{
  register: tags,
  options: { tags: tagsData }
}], function (err) {
  Hoek.assert(!err, 'error registering plugin');
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply(request.jackmisawesome);
  }
});

module.exports = server;
