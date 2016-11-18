'use strict';

var test = require('tape');
var init = require('../example/server.js');
var tags = require('../example/tags.json');
var config = require('../config/load-config.js');

test('Server start without any error', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail();
    }

    return pool.end(function () {
      server.stop(t.end);
    });
  });
});

test('The list of tags is return on the / endpoint', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail();
    }

    return server.inject({
      method: 'GET',
      url: '/'
    }, function (res) {
      t.equal(res.statusCode, 200,
        'the / endpoint status code is 200');

      t.ok(JSON.parse(res.payload).length, tags.length,
        'There are the correct number of tags in the database');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
