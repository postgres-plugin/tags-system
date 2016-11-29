'use strict';

var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');


test('pg.tags.getTagsForEdit function gives with selected: true', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      return t.fail(err);
    }

    return server.inject({ url: '/getTagsForEdit?tableName=challenges&id=2' },
    function (response) {
      var allTags = response.result;

      t.equal(Object.keys(allTags).length, 16, '16 active categories are returned'); //eslint-disable-line
      t.equal(allTags[0].category_name, 'BIOLOGICAL CYCLE', 'Categories are ordered alphabetically'); //eslint-disable-line
      t.equal(allTags[0].tags[0].tag_name, 'Agriculture', 'Tags are ordered alphabetically'); //eslint-disable-line

      var memberType = allTags.filter(function (cat) { //eslint-disable-line
        return cat.category_name === 'MEMBER TYPE';
      });

      t.ok(memberType[0].tags[1].selected, 'Corporate tag is selected');

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});
