'use strict';

var test = require('tape');
var initialisePgTags = require('../lib/helpers/initialise-pg-tags.js');

test('Add {pg: {tags: {} }} to the object request', function (t) {
  var request = {};

  initialisePgTags(request);
  t.deepEqual(request,
    { pg: { tags: {} } },
    'The request object is initialise with pg.tags');
  t.end();
});

test('Add pg.tags to the object request with pg already defined', function (t) {
  var request = { pg: {} };

  initialisePgTags(request);
  t.deepEqual(request,
    { pg: { tags: {} } },
    'The request object is initialise with pg.tags (pg already defined)');
  t.end();
});
