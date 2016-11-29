'use strict';

var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');

test('Create tags_challenges and add tags', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail(err);
    }

    return server.inject({ url: '/addTags' }, function (res) {
      t.equal(res.payload, '[]', 'Tags added to tags_challenges');

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});
