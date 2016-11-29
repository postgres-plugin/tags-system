'use strict';

var test = require('tape');
var getTagsForEdit = require('../../lib/queries/get-tags-for-edit.js');

var expectedQuery = 'SELECT '
 + 'CASE WHEN tags_challenges.challenges_id = 2 THEN TRUE ELSE FALSE END '
 + 'AS selected, '
 + 'tags.id AS tag_id, tags.name AS tag_name, '
 + 'categories.name AS category_name, categories.id AS category_id '
 + 'FROM tags_challenges '
 + 'RIGHT OUTER JOIN tags ON '
 + 'tags_challenges.challenges_id = 2 '
 + 'AND tags_challenges.tags_id = tags.id '
 + 'LEFT OUTER JOIN tags_categories ON '
 + 'tags.id = tags_categories.tags_id '
 + 'LEFT OUTER JOIN categories ON '
 + 'tags_categories.categories_id = categories.id '
 + 'WHERE '
 + 'tags.active = TRUE AND categories.active = TRUE '
 + 'ORDER BY '
 + 'categories.name, tags.name;';

test('Get all tags for edit challenge query', function (t) {
  t.equal(getTagsForEdit('challenges', 2), expectedQuery,
    'getTagsForEdit(\'challenges\', 2) returns a correct query');
  t.end();
});
