'use strict';

var query = require('pg-helpers').query;
var path = require('path');
var fileName = path.resolve(__dirname, 'fixtures/challenges.sql');
var fs = require('fs');
var querySql = fs.readFileSync(fileName, 'utf8').toString();

module.exports = function (pool, cb) {
  query(querySql, pool, function (error, response) {
    return cb(error, response);
  });
};
