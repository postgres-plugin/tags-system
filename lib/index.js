'use strict';

var query = require('pg-helpers').query;
var queries = require('./queries/index.js');
var convertAllActive = require('./helpers/convert-all-active.js');
var initialisePgTags = require('./helpers/initialise-pg-tags.js');
var initialiseQuery = require('./helpers/initialise-query.js');

module.exports.register = function (server, options, next) {
  var pool = options.pool;
  // the order of concatenation is important!

  // initialise the tags table
  query(initialiseQuery(options), pool, function (error) {
    if (error) {
      return next(error);
    }

    // expose functions to the request object
    server.ext('onPreHandler', function (request, reply) {
      // initialise the object linked to the requrest
      initialisePgTags(request);
      // add functions
      request.pg.tags.getTags = function (cb) {
        query(queries.getTags, pool, cb);
      };

      request.pg.tags.getAllActive = function (cb) {
        var result = {};

        query(queries.getAllActive, pool, function (errorQuery, allActive) {
          if (!errorQuery) {
            result = convertAllActive(allActive);
          }

          return cb(errorQuery, result);
        });
      };

      request.pg.tags.addTags = function (tableName, itemId, tagIds, cb) {
        var addTagsQuery = queries.addTags(tableName, itemId, tagIds);

        query(addTagsQuery, pool, cb);
      };

      reply.continue();
    });

    return next(error);
  });
};

module.exports.register.attributes = { name: 'tags' };
