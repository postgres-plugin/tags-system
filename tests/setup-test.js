'use strict';

var tape = require('tape');
var server = require('../example/server.js');

tape('check that plugin is being attached to the request object', function (t) {
  server.inject({
    method: 'GET',
    url: '/'
  }, function (result) {
    t.equal(result.statusCode, 200,
      'Looks for the endpoint where method is attached to request object.');
    t.equal(typeof result.request.jackmisawesome, 'function',
      'Checks to see if method exists and is a function');
    t.equal(result.request.jackmisawesome(), 'Abracadabra!',
      'Checks to see if method content is as expected');
    t.end();
  });
});


tape('teardown', function (t) {
  server.app.pgConnection.done();
  t.end();
});
