'use strict';

var query = require('pg-helpers').query;
var queries = require('./queries/index.js');
var path = require('path');
var fs = require('fs');
var file = path.resolve(__dirname, 'fixtures/tags-table.sql');
var fixtures = fs.readFileSync(file, 'utf8').toString();
var tagsContent = require('./fixtures/tags-content.js');
var categoriesContent = require('./fixtures/categories-content.js');
var tagsCatContent = require('./fixtures/tags-categories-content.js');
var convertAllActive = require('./helpers/convert-all-active.js');
var initialisePgTags = require('./helpers/initialise-pg-tags.js');

module.exports.register = function (server, options, next) {
  var pool = options.pool;
  // the order of concatenation is important!
  var initialiseQuery = fixtures
    + tagsContent(options.tags)
    + categoriesContent(options.categories)
    + tagsCatContent(options.tags);

  // initialise the tags table
  query(initialiseQuery, pool, function (error) {
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
      reply.continue();
    });

    return next(error);
  });
};

module.exports.register.attributes = { name: 'tags' };
