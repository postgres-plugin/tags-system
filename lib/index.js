'use strict';

var Hoek = require('hoek');
var pg = require('pg');
var pgConnection;


function tagString (tags) {
  return tags.reduce(function (str, tag, ind) {
    if (ind !== 0) {
      return str + ', (\'' + tag.name + '\', ' + tag.active + ')';
    }

    return str + '(\'' + tag.name + '\', ' + tag.active + ')';
  }, '');
}

function register (server, options, next) {
  // connect the client
  pg.connect({}, function (err, client, done) {
    Hoek.assert(!err, err);

    // save the client to a variable that we can export
    pgConnection = { client: client, done: done };
    // export the client
    server.app.pgConnection = pgConnection;

    // add a function to the request object
    // This doesnt seem to work when done in the callback of pg.connect
    server.ext('onPreAuth', function (request, reply) {
      request.jackmisawesome = function () {
        return 'Abracadabra!';
      };
      reply.continue();
    });

    // populate the tags db with initial tag data
    pgConnection.client.query(
      'INSERT INTO tags (name, active) VALUES '
        + tagString(options.tags),
      function (err1) {
        Hoek.assert(!err1, err1);
      }
    );

    next();
  });
}

register.attributes = {
  name: 'tags',
  version: '1.0.0'
};

module.exports = register;


// Loud errors are distracting
// No console logs for development
// Not allowed to use double quotes
// cannot define helper functions at bottom of file
