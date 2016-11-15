'use strict';

var initialiseTableTags = require('./helpers/initialise-table-tags.js');
var query = require('pg-helpers').query;
var queries = require('./queries/index.js');

module.exports.register = function (server, options, next) {
  var pool = options.tagsPool;

  // initialise the tags table
  initialiseTableTags(options.tags, pool, function (error) {
    if (error) {
      return next(error);
    }
    // expose functions to the request object
    server.ext('onPreHandler', function (request, reply) {
      request.getTags = function (cb) {
        query(queries.getTags, pool, function (errorTags, tags) {
          return cb(errorTags, tags);
        });
      };
      reply.continue();
    });

    return next(error);
  });
};

module.exports.register.attributes = { name: 'tags' };
