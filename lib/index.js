'use strict';

var initialiseTable = require('./helpers/initialise-table.js');
var getTags = require('./api/get-tags.js');

module.exports.register = function (server, options, next) {
  var pool = options.tagsPool;

  // initialise the tags table
  initialiseTable(pool, options.tags, function (error) {
    if (error) {
      return next(error);
    }
    // expose functions to the request object
    server.ext('onPreHandler', function (request, reply) {
      request.getTags = function (cb) {
        getTags(pool, function (errorTags, tags) {
          return cb(errorTags, tags);
        });
      };
      reply.continue();
    });

    return next(error);
  });
};

module.exports.register.attributes = { name: 'tags' };
