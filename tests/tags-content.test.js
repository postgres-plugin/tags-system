'use strict';

var test = require('tape');
var tagsContent = require('../lib/fixtures/tags-content.js');

test('The tags content is empty if no tags', function (t) {
  var result = tagsContent([]);

  t.ok(result === '', 'The query for the tags content is empty');
  t.end();
});
