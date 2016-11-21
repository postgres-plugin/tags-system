'use strict';

var test = require('tape');
var Hoek = require('hoek');
var init = require('../example/server.js');
var config = require('../config/load-config.js');
var createChallenges = require('./helpers/create-challenges.js');
var tagsData = require('./helpers/fixtures/tags.json');
var categoriesData = require('./helpers/fixtures/categories.json');
var getTagsForEdit = require('../lib/queries/get-tags-for-edit.js');

var expectedQuery = 'SELECT '
 + 'CASE WHEN tags_challenges.challenges_id = 0 THEN TRUE ELSE FALSE END '
 + 'AS selected, '
 + 'tags.id AS id_tag, tags.name AS name_tag, '
 + 'categories.name AS name_cat, categories.id AS id_cat '
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

test('Get all tags for edit challenge query', function (t) {
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


test('pg.tags.getTagsForEdit function gives with selected: true', function (t) {
  config.tagsData = tagsData;
  config.categoriesData = categoriesData;

  init(config, function (err, server, pool) {
    if (err) {
      return t.fail(err);
    }

    return createChallenges(pool, function (error) {
      Hoek.assert(!error, 'error creating challenges');
      server.inject({ url: '/getTagsForEdit?tableName=challenges&id=0' },
      function (response) {
        var allTags = response.result;

        t.equal(Object.keys(allTags).length, 3, '3 active categories are returned'); //eslint-disable-line
        t.equal(allTags[0].tags[0].selected, false, 'the first tag is not selected'); //eslint-disable-line
        t.equal(allTags[0].tags[1].selected, true, 'the first tag is selected');

        return pool.end(function () { // eslint-disable-line
          server.stop(t.end);
        });
      });
    });
  });
});
