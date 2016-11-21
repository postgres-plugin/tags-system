'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');

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
      tags: config.tagsData || tagsData,
      categories: config.categoriesData || categoriesData,
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
    }, {
      method: 'GET',
      path: '/addTags',
      handler: function (request, reply) {
        request.pg.tags.addTags('challenges', 2, [1, 2], function (error, added) { //eslint-disable-line
          Hoek.assert(!error, error);

          return reply(added);
        });
      }
    }, {
      method: 'GET',
      path: '/getByTag',
      handler: function (request, reply) {
        request.pg.tags.getChallengesByTag(request.query.tags, function (error, challenges) { //eslint-disable-line
          Hoek.assert(!error, error);

          return reply(challenges);
        });
      }
    }, {
      method: 'GET',
      path: '/getTagsForEdit',
      handler: function (request, reply) {
        var table = request.query.tableName;
        var id = request.query.id;

        request.pg.tags.getTagsForEdit(table, id, function (error, allTags) { //eslint-disable-line
          Hoek.assert(!error, error);

          return reply(allTags);
        });
      }
    }
    ]);

    return callback(null, server, tagsPool);
  });
}

module.exports = init;
