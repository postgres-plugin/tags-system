'use strict';

/**
* Create the tags table
**/
var path = require('path');
var fs = require('fs');
var file = path.resolve(__dirname, '../fixtures/tags-table.sql');
var fixtures = fs.readFileSync(file, 'utf8').toString();
var tagsContent = require('../fixtures/tags-content.js');

module.exports = function (pool, tags, cb) {
  var content = tagsContent(tags);

  pool.connect(function (poolError, client, done) {
    if (poolError) {
      return cb(poolError);
    }
    return client.query(fixtures, function (errorTable) { //eslint-disable-line
      if (errorTable) {
        return cb(errorTable);
      }

      if (tags.length > 0) {
        client.query(content, function (errorContent) {
          if (errorContent) {
            return cb(errorContent);
          }
          done();

          return cb();
        });
      } else {
        done();

        return cb();
      }
    });
  });
};
