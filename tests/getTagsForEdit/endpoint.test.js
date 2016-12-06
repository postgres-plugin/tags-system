'use strict';

var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');

// this returns all tags with `selected: true` in an array
// and all category ids with selected true
function getSelected (allTags) {
  var selectedTags = [];
  var selectedCategories = [];
  allTags.forEach(function (cat) {
    cat.selected && selectedCategories.push(cat.category_id);
    cat.tags.forEach(function (tag) {
      tag.selected && selectedTags.push(tag);
    })
  })
  return { tags: selectedTags, selectedCategories: selectedCategories }
}

test('pg.tags.getTagsForEdit with challenges', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail(err);
    }

    return server.inject({ url: '/getTagsForEdit?tableName=challenges&id=2' },
    function (response) {
      var allTags = response.result;

      t.equal(Object.keys(allTags).length, 16, '16 active categories are returned');
      t.equal(allTags[0].category_name, 'BIOLOGICAL CYCLE', 'Categories are ordered alphabetically');
      t.equal(allTags[0].tags[0].tag_name, 'Agriculture', 'Tags are ordered alphabetically');

      var selected = getSelected(allTags);

      var actualSelectedTags = [ { tag_id: 2, tag_name: 'Corporate', selected: true } ];

      t.deepEqual(selected.tags, actualSelectedTags, 'challenge with id 2 has the correct tag attached or `selected`');
      t.deepEqual(selected.selectedCategories, [1], 'the correct category is `selected`');

      pool.end();
      server.stop();
      t.end();
    });
  });
});





test('organisation has the correct tags attached (`selected`): --> ' + __filename, function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail(err);
    }

    return server.inject({ url: '/getTagsForEdit?tableName=organisations&id=1' }, function (res) {
      var allTags = res.result;
      // org with id 1 has 2 tags attached to it:
      // tag id: 1, tag name: Global Partner, cat name: Member Type
      // tag id: 27, tag name: UK, cat name: Headquarters/Location...
      var expectedSelectedTags = [
        { tag_id: 27, tag_name: 'UK', selected: true },
        { tag_id: 1, tag_name: 'Global Partner', selected: true }
      ]
      var selected = getSelected(allTags);

      t.deepEqual(selected.tags, expectedSelectedTags, 'organisation 1 has the correct tags `selected`');
      t.deepEqual(selected.selectedCategories, [3, 1], 'the correct categories are `selected`');


      pool.end();
      server.stop();
      t.end();
    });
  });
});
