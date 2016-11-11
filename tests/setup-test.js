'use strict';

var tape = require('tape');
var init = require('../example/server.js');
var tags = require('../example/tags.json');
var server, tagsPool;

var config = {
  user: 'postgres',
  database: 'tags',
  password: '',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
// Tests assume we have a table called tags which is empty


// First check that the DB is empty
// tape('check that the DB is empty', function (t) {
//   tagsPool.connect(function (conErr, client, done) {
//     if (conErr) {
//       t.fail();
//     }
//     t.equal(typeof client, 'object',
//       'We can connect to the db');
//
//     client.query('select * from tags;', function (dbErr, results) {
//       if (dbErr) {
//         return t.fail();
//       }
//
//       t.equal(typeof results.rows, 'object',
//         'we successfully connected to the tags table');
//
//       t.equal(results.rows.length, 0,
//         'The tags table has 0 rows');
//
//       t.end();
//
//       return done();
//     });
//   });
// });


// set up server
tape('set up server', function (t) {
  init(2000, config, function (err, newServer, newTagsPool) { // eslint-disable-line
    if (err) {
      return t.fail();
    }
    server = newServer;
    tagsPool = newTagsPool;

    return t.end();
  });
});


tape('check that plugin is being attached to the request object', function (t) {
  server.inject({
    method: 'GET',
    url: '/'
  }, function (res) {
    t.equal(res.statusCode, 200,
      'Looks for the endpoint where method is attached to request object.');

    t.ok(JSON.parse(res.payload).length, tags.length,
      'There are the correct number of tags in the DB after plugin is added');

    t.end();
  });
});


tape('teardown', function (t) {
  tagsPool.end(function () {
    t.end();
  });
});
