'use strict';

var test = require('tape');
var init = require('../example/server.js');
var config = require('../config/load-config.js');
var createChallenges = require('./helpers/create-challenges.js');
var tagsData = require('./helpers/fixtures/tags.json');
var categoriesData = require('./helpers/fixtures/categories.json');
var getTagsForEdit = require('../lib/queries/get-tags-for-edit.js');

var expectedQuery = 'SELECT '
 + 'CASE WHEN tags_challenges.challenges_id = 0 THEN TRUE ELSE FALSE END '
 + 'AS selected, '
 + 'tags.id AS tag_id, tags.name AS tag_name, '
 + 'categories.name AS cat_name '
 + 'FROM tags_challenges '
 + 'RIGHT OUTER JOIN tags ON '
 + 'tags_challenges.challenges_id = 0 '
 + 'AND tags_challenges.tags_id = tags.id '
 + 'LEFT OUTER JOIN tags_categories ON '
 + 'tags.id = tags_categories.id_tag '
 + 'LEFT OUTER JOIN categories ON '
 + 'tags_categories.id_category = categories.id '
 + 'WHERE '
 + 'tags.active = TRUE AND categories.active = TRUE;';

test('Create tags_challenges and add tags', function (t) {
  config.tagsData = tagsData;
  config.categoriesData = categoriesData;

  init(config, function (err, server, pool) {
    if (err) {
      return t.fail(err);
    }

    return createChallenges(pool, function (error) {
      t.ok(!error, 'error when creating challenges table: ' + error);

      t.equal(getTagsForEdit('challenges', 0), expectedQuery,
        'getTagsForEdit(\'challenges\', 0) returns a correct query');

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});
