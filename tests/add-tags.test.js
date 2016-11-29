'use strict';

var test = require('tape');
var addTags = require('../lib/queries/add-tags.js');
var init = require('../example/server.js');
var config = require('../config/load-config.js');


test('addTags function formats a valid query string', function (t) {
  var actual = addTags('challenges', 0, [0, 3, 9]);
  var expectedQuery = 'INSERT INTO tags_challenges (tags_id, challenges_id) '
  + 'VALUES (0, 0),(3, 0),(9, 0);';

  t.equal(actual, expectedQuery, 'The query for addTags is formatted');
  t.end();
});

test('Create tags_challenges and add tags', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail(err);
    }

    server.inject({ url: '/addTags' }, function (res) {
      t.equal(res.payload, '[]', 'Tags added to tags_challenges');

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});
