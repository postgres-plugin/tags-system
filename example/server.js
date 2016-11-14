'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var fs = require('fs');

var server = new Hapi.Server();
var tagsData = JSON.parse(fs.readFileSync('./example/tags.json').toString());
var tags = require('../lib/index.js');
var pg = require('pg');


function init (port, pgConfig, callback) {
  var tagsPool = new pg.Pool(pgConfig);

  server.connection({ port: port });

  server.route([{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return reply('hello');
    }
  }]);

  server.register([{
    register: tags,
    options: {
      tags: tagsData,
      tagsPool: tagsPool,
      databaseName: pgConfig.databaseName
    }
  }], function (err) {
    Hoek.assert(!err, err);

    return callback(null, server, tagsPool);
  });

  //
  // server.register([{
  //   register: tags,
  //   options: {
  //     tags: tagsData,
  //     tagsPool: tagsPool,
  //     databaseName: pgConfig.database
  //   }
  // }], function (err) {
  //   console.log('AAAAAAAAAA');
  //   Hoek.assert(!err, err);
  //   // if (err) {
  //   //   return callback(err);
  //   // }
  //
  //   server.route([{
  //     method: 'GET',
  //     path: '/home',
  //     handler: function (request, reply) {
  //       // tagsPool.connect(function (connErr, client, done) {
  //         // Hoek.assert(!connErr, connErr);
  //         // done();
  //
  //         return reply('home');
  //         // client.query('select * from testtags', function (dberr, res) {
  //         //   Hoek.assert(!dberr, dberr);
  //         //   done();
  //         //
  //         //   return reply(res.rows);
  //         // });
  //       // });
  //     }
  //   }]);
  //
  //   return callback(null, server, tagsPool);
  // });
}

module.exports = init;
