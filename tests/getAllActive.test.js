'use strict';

var Hoek = require('hoek');
var test = require('tape');
var init = require('../example/server.js');
var config = require('../config/load-config.js');

test('getAllActive function', function (t) {
  init(config, function (err, server, pool) {
    Hoek.assert(!err, 'server setup error');

    server.inject({ url: '/getAllActive' }, function (res) {
      var allActiveObj = JSON.parse(res.payload);

      t.deepEqual(Object.keys(allActiveObj[1].tags),
        ['2', '3', '4'],
        'more than 4 items');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});