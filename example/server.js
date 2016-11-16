'use strict';

var Hapi = require('hapi');

var tagsData = require('./tags.json');
var categoriesData = require('./categories.json');
var tags = require('../lib/index.js');
var pg = require('pg');

function init (port, pgConfig, callback) {
  var server = new Hapi.Server();
  var tagsPool = new pg.Pool(pgConfig);

  server.connection({ port: port });

  server.register([{
    register: tags,
    options: {
      tags: tagsData,
      categories: categoriesData,
      pool: tagsPool,
      databaseName: pgConfig.database
    }
  }], function (err) {
    if (err) {
      return callback(err);
    }
    server.route([{
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        request.getTags(function (error, listTags) { //eslint-disable-line
          return reply(listTags);
        });
      }
    }]);

    return server.start(function (errorStart) {
      return callback(errorStart, server, tagsPool);
    });
  });
}

module.exports = init;
