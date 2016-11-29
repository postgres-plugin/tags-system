'use strict';

var test = require('tape');
var addTags = require('../../lib/queries/add-tags.js');


test('addTags function formats a valid query string', function (t) {
  var actual = addTags('challenges', 1, [1, 4, 10]);
  var expectedQuery = 'INSERT INTO tags_challenges (tags_id, challenges_id) '
  + 'VALUES (1, 1),(4, 1),(10, 1);';

  t.equal(actual, expectedQuery, 'The query for addTags is formatted');
  t.end();
});
