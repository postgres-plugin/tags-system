'use strict';

var query = require('pg-helpers').query;
var path = require('path');
var fs = require('fs');
var file = path.resolve(__dirname, '../fixtures/tags-table.sql');
var fixtures = fs.readFileSync(file, 'utf8').toString();
var tagsContent = require('../fixtures/tags-content.js');

module.exports = function (tags, pool, cb) {
  var sqlQuery = fixtures + tagsContent(tags);

  query(sqlQuery, pool, function (error, response) {
    return cb(error, response);
  });
};
