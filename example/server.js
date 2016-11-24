'use strict';

var Hapi = require('hapi');

var tags = require('../lib/index.js');
var pg = require('pg');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);
  var optionsTags = {
    reset: Boolean(process.env.RESET_TABLES_TAGS), // reset with content passed in the options, change the env to true and restart to add content
    pool: pool,
    tags: [],
    categories: []
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
        request.pg.tags.addTags('challenges', 1, [1, 2],function (error, added) { //eslint-disable-line
          return reply(added);
        });
      }
    }
    ]);

    return callback(null, server, pool);
  });
}

module.exports = init;
