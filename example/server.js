'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var fs = require('fs');
var pg = require('pg');

var server = new Hapi.Server();
var tagsData = JSON.parse(fs.readFileSync('./example/tags.json').toString());
var tags = require('../lib/index.js');
var tagsPool = new pg.Pool();


function init (port, callback) {
  server.connection({ port: process.env.PORT || port || 3000 });

  server.register([{
    register: tags,
    options: { tags: tagsData, tagsPool: tagsPool }
  }], function (err) {
    if (err) {
      return callback(err);
    }

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        tagsPool.connect(function (connErr, client, done) {
          Hoek.assert(!connErr, connErr);
          process.stdout.write('doing some nice stuff with the client\n');
          client.query('select * from tags', function (dberr, res) {
            Hoek.assert(!dberr, dberr);
            done();

            return reply(res.rows);
          });
        });
      }
    });

    return callback(null, server);
  });
}


module.exports = { init: init, tagsPool: tagsPool };
