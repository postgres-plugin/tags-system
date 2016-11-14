'use strict';

/**
* Create the tags table
**/
var path = require('path');
var fs = require('fs');
var file = path.resolve(__dirname, '../fixtures/tags-table.sql');
var fixtures = fs.readFileSync(file, 'utf8').toString();
var tagsContent = require('../fixtures/tags-content.js');

module.exports = function (client, tags, cb) {
  var content = tagsContent(tags);

  client.query(fixtures, function (errorTable) { //eslint-disable-line
    if (errorTable) {
      return cb(errorTable);
    }

    if (tags.length > 0) {
      client.query(content, function (errorContent) {
        if (errorContent) {
          return cb(errorContent);
        }

        return cb();
      });
    } else {
      return cb();
    }
  });
};
