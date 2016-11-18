'use strict';

var Hapi = require('hapi');

var tagsData = require('./tags.json');
var categoriesData = require('./categories.json');
var tags = require('../lib/index.js');
var pg = require('pg');

function init (config, callback) {
  var server = new Hapi.Server();
  var tagsPool = new pg.Pool(config.pg);

  server.connection({ port: config.port });

  server.register([{
    register: tags,
    options: {
      tags: tagsData,
      categories: categoriesData,
      pool: tagsPool
    }
  }], function (err) {
    if (err) {
      return callback(err);
    }
    server.route([{
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        request.pg.tags.getTags(function (error, listTags) { //eslint-disable-line
          return reply(listTags);
        });
      }
    }, {
      method: 'GET',
      path: '/getAllActive',
      handler: function (request, reply) {
        request.pg.tags.getAllActive(function (error, allTags) { //eslint-disable-line
          return reply(allTags);
        });
      }
    }]);

    return callback(null, server, tagsPool);
  });
}

module.exports = init;
