'use strict';

/**
* create an sql query which
* - create the tables people, organisations, tags_organisations if not defined
* - add some content to the table if options.reset is true
*/
var path = require('path');
var fs = require('fs');
var dropFile = path.resolve(__dirname, '../fixtures/drop-tables.sql');
var createTablesFile = path.resolve(__dirname, '../fixtures/create-tables.sql');
var dropTables = fs.readFileSync(dropFile, 'utf8').toString();
var createTables = fs.readFileSync(createTablesFile, 'utf8').toString();
var tagsData = require('../fixtures/tags-data.js');
var categoriesData = require('../fixtures/categories-data.js');
var tagsCatData = require('../fixtures/tags-categories-data.js');

module.exports = function (options) {
  var query = '';

  if (options.reset) {
    query += dropTables;
    query += createTables;
    query += tagsData(options.tags);
    query += categoriesData(options.categories);
    query += tagsCatData(options.tags);

    return query;
  }

  return createTables;
};
