'use strict';

var initialiseTable = require('./helpers/initialise-table.js');
var getTags = require('./helpers/functions/get-tags.js');

module.exports.register = function (server, options, next) {
  options.tagsPool.connect(function (poolError, client, done) {
    if (poolError) {
      return next(poolError);
    }

    return initialiseTable(client, options.tags, function (error) {
      server.ext('onPreHandler', function (request, reply) {
        request.getTags = function (cb) {
          getTags(client, function (errorTags, tags) {
            return cb(errorTags, tags);
          });
        };
        reply.continue();
      });
      done();

      return next(error);
    });
  });
};

module.exports.register.attributes = { name: 'tags' };
