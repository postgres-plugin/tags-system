'use strict';

var test = require('tape');

var config = require('../config/load-config.js');
var init = require('../example/server.js');

test('get all challenges with tag id 2 attached using getByTag function', function (t) { //eslint-disable-line
  init(config, function (error, server, pool) {
    var options = { url: '/getByTag?tags=2' };

    if (error) {
      return t.fail(error);
    }

    return server.inject(options, function (response) {
      t.equal(response.result.length, 1, '1 Challenge is returned');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
