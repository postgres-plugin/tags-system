'use strict';

var query = require('pg-helpers').query;
var queries = require('./queries/index.js');
var convertAllActive = require('./helpers/convert-all-active.js');
var initialiseQuery = require('./helpers/initialise-query.js');

module.exports.register = function (server, options, next) {
  var pool = options.pool;
  var getTags = function (cb) {
    query(queries.getTags, pool, function (errorQuery, res) {
      if (errorQuery) {
        return cb(errorQuery);
      }

      return cb(null, res.rows);
    });
  };

  var getAllActive = function (cb) {
    var result = {};

    query(queries.getAllActive, pool, function (errorQuery, res) {
      if (!errorQuery) {
        result = convertAllActive(res.rows);
      }

      return cb(errorQuery, result);
    });
  };

  var addTags = function (tableName, itemId, tagIds, cb) {
    var addTagsQuery = queries.addTags(tableName, itemId, tagIds);

    query(addTagsQuery, pool, function (errorQuery, res) {
      if (errorQuery) {
        return cb(errorQuery);
      }

      return cb(null, res.rows);
    });
  };

  var getTagsForEdit = function (tableName, itemId, cb) {
    var result = {};

    query(queries.getTagsForEdit(tableName, itemId), pool, function (errorQuery, res) { // eslint-disable-line
      if (!errorQuery) {
        result = convertAllActive(res.rows);
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
