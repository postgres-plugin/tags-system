'use strict';

var Hoek = require('hoek');
var file = require('path').resolve('./lib/tags.sql');
var tagsTable = require('fs').readFileSync(file, 'utf8')
                             .toString();

function tagString (tags) {
  return 'INSERT INTO tags (id, name, active) VALUES '
    + tags.reduce(function (str, tag, ind) {
      if (ind !== 0) {
        return str + ', (' + tag.id + ' ,\'' + tag.name + '\', ' + tag.active + ')';
      }

      return str + '(' + tag.id + ' ,\'' + tag.name + '\', ' + tag.active + ')';
    }, '');
}

function register (server, options, next) {
  options.tagsPool.connect(function (connErr, client, done) {
    Hoek.assert(!connErr, connErr);
    // if (connErr) {
    //   done();
    //
    //   return next(connErr);
    // }

    // Set up tables from .sql file
    client.query(tagsTable, function (initErr) {
      Hoek.assert(!initErr, initErr);

      // Add tags to db
      client.query(tagString(options.tags), function (queryErr) {
        Hoek.assert(!queryErr, queryErr);
        // if (queryErr) {
        //   done();
        //
        //   return next(queryErr);
        // }
        done();

        return next();
      });
    });
  });
}

register.attributes = {
  name: 'tags',
  version: '1.0.0'
};


module.exports = register;
