'use strict';

var test = require('tape');
var addTags = require('../lib/queries/add-tags.js');

test('addTags function formats a valid query string', function (t) {
  var actual = addTags('challenges', 0, [0, 3, 9]);
  var expectedQuery =
    'INSERT INTO tags_challenges (tag_id, challenges_id) VALUES (0, 0);'
  + 'INSERT INTO tags_challenges (tag_id, challenges_id) VALUES (0, 3);'
  + 'INSERT INTO tags_challenges (tag_id, challenges_id) VALUES (0, 9);';

  t.equal(actual, expectedQuery, 'The query for addTags is formatted');
  t.end();
});
