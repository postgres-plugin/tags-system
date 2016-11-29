'use strict';

var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');
var createChallenges = require('../helpers/create-challenges.js');


test('Get all tags for edit challenge query', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail(err);
    }

    return createChallenges(pool, function (error) {
      t.ok(!error, 'error when creating challenges table: ' + error);

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});
