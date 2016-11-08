'use strict';

var Hoek = require('hoek');
var pg = require('pg');
var file = require('path').resolve('./lib/tags.sql');
var tagsTable = require('fs').readFileSync(file, 'utf8')
                             .toString();

function create_tables (callback) {
  // username, password and nameOfDB need to be switched out to local settings
  // settings are currently different between developers
  var connection = process.env.DATABASE_URL
                   || 'postgres://username:password@localhost:5432/nameOfDB';
  var client = new pg.Client(connection);

  client.connect(function (client_err) {
    Hoek.assert(!client_err, 'failed to connect to PostGres Client');
    client.query(tagsTable, function (err, result) {
      client.end();

      return callback(err, result);
    });
  });
}

create_tables(function (err, data) {
  Hoek.assert(!err, 'error returned from creating table');
  // REMOVE OR FIX LINTER --> ESLINT doesn't want console logs or un-used vars
  Hoek.assert(!data, 'data returned from creating table');
});
