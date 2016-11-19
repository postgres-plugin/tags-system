'use strict';

var test = require('tape');

var config = require('../config/load-config.js');
var init = require('../example/server.js');

config.tagsData = require('./helpers/fixtures/tags.json');
config.categoriesData = require('./helpers/fixtures/categories.json');

test('get all challenges with tag id 2 attached using getByTag function', function (t) { //eslint-disable-line
  init(config, function (error, server, pool) {
    var options = { url: '/getByTag?tags=2' };

    if (error) {
      return t.fail(error);
    }

    return server.inject(options, function (response) {
      // console.log(response.result);
      t.equal(response.result.length, 3, '3 Challenges are returned');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
