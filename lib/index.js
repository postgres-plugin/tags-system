'use strict';

var query = require('pg-helpers').query;
var queries = require('./queries/index.js');
var convertAllActive = require('./helpers/convert-all-active.js');
var initialiseQuery = require('./helpers/initialise-query.js');

module.exports.register = function (server, options, next) {
  var pool = options.pool;
  var getTags = function (cb) {
    query(queries.getTags, pool, cb);
  };

  var getAllActive = function (cb) {
    var result = {};

    query(queries.getAllActive, pool, function (errorQuery, allActive) {
      if (!errorQuery) {
        result = convertAllActive(allActive);
      }

      return cb(errorQuery, result);
    });
  };

  var addTags = function (tableName, itemId, tagIds, cb) {
    var addTagsQuery = queries.addTags(tableName, itemId, tagIds);

    query(addTagsQuery, pool, cb);
  };

  var getTagsForEdit = function (tableName, itemId, cb) {
    var result = {};

    query(queries.getTagsForEdit(tableName, itemId), pool,
    function (errorQuery, allActive) {
      if (!errorQuery) {
        result = convertAllActive(allActive);
      }


      return cb(errorQuery, result);
    });
  };

  // initialise the tags table
  query(initialiseQuery(options), pool, function (error) {
    server.method('pg.tags.getTags', getTags);
    server.method('pg.tags.getAllActive', getAllActive);
    server.method('pg.tags.addTags', addTags);
    server.method('pg.tags.getTagsForEdit', getTagsForEdit);

    return next(error);
  });
};

module.exports.register.attributes = { name: 'tags' };
