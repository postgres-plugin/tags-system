'use strict';

var test = require('tape');
var Hoek = require('hoek');
var config = require('../config/load-config.js');
var init = require('../example/server.js');
var createChallenges = require('./helpers/create-challenges.js');
var tagsData = require('./helpers/fixtures/tags.json');
var categoriesData = require('./helpers/fixtures/categories.json');

test('get all challenges with tag id 2 attached using getByTag function', function (t) { //eslint-disable-line
  config.tagsData = tagsData;
  config.categoriesData = categoriesData;

  init(config, function (error, server, pool) {
    if (error) {
      return t.fail(error);
    }

    return createChallenges(pool, function (createChallengeError) {
      var options = { url: '/getByTag?tags=2' };

      Hoek.assert(!createChallengeError, 'create challenges error');

      return server.inject(options, function (response) {
        t.equal(response.result.length, 2, '2 Challenges are returned');

        return pool.end(function () { // eslint-disable-line
          server.stop(t.end);
        });
      });
    });
  });
});
