'use strict';

var pg = require('pg');
var pool;

function tagsPool (config) {
  if (pool) {
    return pool;
  }
  pool = new pg.Pool(config);

  return pool;
}

module.exports = tagsPool;
