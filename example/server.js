'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');

var tagsData = require('./data/tags.json');
var categoriesData = require('./data/categories.json');
var tags = require('../lib/index.js');
var pg = require('pg');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);
  var optionsTags = {
    reset: true,
    pool: pool,
    tags: tagsData,
    categories: categoriesData
  };

  pool.on('error', function () {
    console.log('Pool error'); // eslint-disable-line
  });
  server.connection({ port: config.port });

  server.register([{
    register: tags,
    options: optionsTags
  }], function (err) {
    if (err) {
      return callback(err);
    }
    server.route([{
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        request.server.methods.pg.tags.getTags(function (error, listTags) { //eslint-disable-line
          return reply(listTags);
        });
      }
    }, {
      method: 'GET',
      path: '/getAllActive',
      handler: function (request, reply) {
        request.server.methods.pg.tags.getAllActive(function (error, allTags) { //eslint-disable-line
          return reply(allTags);
        });
      }
    }, {
      method: 'GET',
      path: '/addTags',
      handler: function (request, reply) {
        request.server.methods.pg.tags.addTags('challenges', 1, [1, 2],function (error, added) { //eslint-disable-line
          Hoek.assert(!error, error);

          return reply(added);
        });
      }
    }, {
      method: 'GET',
      path: '/getTagsForEdit',
      handler: function (request, reply) {
        var table = request.query.tableName;
        var id = request.query.id;

        request.server.methods.pg.tags.getTagsForEdit(table, id, function (error, allTags) { //eslint-disable-line
          Hoek.assert(!error, error);

          return reply(allTags);
        });
      }
    }
    ]);

    return callback(null, server, pool);
  });
}

module.exports = init;
