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
  if (err) {
    Hoek.assert(err);
  }
});


server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    server.app.tagsPool.connect(function (err, client, done) {
      Hoek.assert(!err, err);
      process.stdout.write('doing some nice stuff with the client\n');
      done();

      return reply(request.jackmisawesome);
    });
  }
});

module.exports = server;
