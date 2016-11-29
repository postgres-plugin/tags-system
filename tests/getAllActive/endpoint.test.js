'use strict';

var Hoek = require('hoek');
var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');

test('getAllActive endpoint test', function (t) {
  init(config, function (err, server, pool) {
    Hoek.assert(!err, 'server setup error');

    server.inject({ url: '/getAllActive' }, function (res) {
      var allActive = res.result;

      t.equal(allActive.length, 16, '16 categories exist');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
