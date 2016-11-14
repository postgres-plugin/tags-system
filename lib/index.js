'use strict';

var Hoek = require('hoek');
var initialiseTable = require('./helpers/initialise-table.js');

function register (server, options, next) {
  options.tagsPool.connect(function (connErr, client, done) {
    Hoek.assert(!connErr, connErr);
    initialiseTable(client, options.tags, function (error) {
      Hoek.assert(!error, error);
      done();

      return next();
    });
  });
}

register.attributes = {
  name: 'tags',
  version: '1.0.0'
};


module.exports = register;
