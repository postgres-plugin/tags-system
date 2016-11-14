'use strict';

var test = require('tape');
var init = require('../example/server.js');
var tags = require('../example/tags.json');
var config = require('../config/load-config.js');

test('Server start ok', function (t) {
  init(0, config, function (err, server, pool) {
    if (err) {
      return t.fail();
    }

    return pool.end(function () {
      server.stop(t.end);
    });
  });
});

// test('check that plugin is being attached to the request object', function (t) {
//   init(0, config, function (err, server, pool) {
//     if (err) {
//       return t.fail();
//     }
//     server.inject({
//       method: 'GET',
//       url: '/'
//     }, function (res) {
//       t.equal(res.statusCode, 200,
//         'Looks for the endpoint where method is attached to request object.');
//
//       t.ok(JSON.parse(res.payload).length, tags.length,
//         'There are the correct number of tags in the DB after plugin is added');
//
//       return server.stop(function () {
//         pool.end(function () {
//           return t.end();
//         });
//       });
//     });
//   });
// });