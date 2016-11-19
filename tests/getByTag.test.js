'use strict';

var test = require('tape');

var config = require('../config/load-config.js');
var init = require('../example/server.js');

config.tagsData = require('./helpers/fixtures/tags.json');
config.categoriesData = require('./helpers/fixtures/categories.json');

test('getByTag function', function (t) {
  init(config, function (error, server, pool) {
    var options = { url: '/getByTag?type=challenges&tag=0' };

    if (error) {
      return t.fail(error);
    }

    return server.inject(options, function (results) {

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
