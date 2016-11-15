'use strict';

var test = require('tape');
var query = require('../lib/helpers/query.js');
var pg = require('pg');

require('env2')('.env');

test('Attempt to execute a query with a wrong pool (wrong db)', function (t) {
  var config = {
    user: process.env.PG_USER || 'postgres',
    database: 'wrongdb',
    password: process.env.PG_PASSWORD || '',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
  };
  var pool = new pg.Pool(config);

  query('select * from tags', pool, function (error, response) {
    t.ok(error, 'The query return an error if the pool is null');
    t.ok(response === null, 'The response is null');
    pool.on('error', function () {
      pool.end(t.end);
    });
  });
});

test('Attempt to execute a wrong query', function (t) {
  var config = {
    user: process.env.PG_USER || 'postgres',
    database: process.env.PG_DATABASE || 'tags',
    password: process.env.PG_PASSWORD || '',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
  };
  var pool = new pg.Pool(config);

  query('wrong * query', pool, function (error, response) {
    t.ok(error, 'The query return an error if the query is wrong');
    t.ok(response === null, 'The response is null');
    pool.end(t.end);
  });
});
