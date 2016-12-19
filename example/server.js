'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');

var tags = require('../lib/index.js');
var pg = require('pg');

var pgChallenges = require('pg-challenges');
var pgPeople = require('pg-people');


var data = require('ce100-mock-data');


function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);

  var optionsTags = {
    reset: true,
    tags: data.tags,
    categories: data.categories,
    pool: pool
  };
  var optionsPeople = {
    pool: pool,
    reset: true,
    people: data.people,
    organisations: data.organisations,
    tags_organisations: data.tags_organisations
  };
  var optionsChallenges = {
    pool: pool,
    reset: true,
    challenges: data.challenges,
    tags_challenges: data.tags_challenges
  };

  pool.on('error', function () {
    console.log('Pool error'); // eslint-disable-line
  });

  server.connection({ port: config.port });

  return server.register({
    register: tags,
    options: optionsTags
  }, function (errorTags) {
    if (errorTags) {
      console.log('tags', errorTags); // eslint-disable-line

      return callback(errorTags);
    }

    return server.register({
      register: pgPeople,
      options: optionsPeople
    }, function (errorPeople) {
      if (errorPeople) {
        console.log('people', errorPeople); // eslint-disable-line

        return callback(errorPeople);
      }

      return server.register({
        register: pgChallenges,
        options: optionsChallenges
      }, function (challengesErr) {
        if (challengesErr) {
          return callback(challengesErr);
        }

        server.route([{
          method: 'GET',
          path: '/',
          handler: function (request, reply) {
            request.server.methods.pg.tags.getTags(function (error, listTags) { //eslint-disable-line
              return reply(listTags);
            });
          }
        }, {
          method: 'GET',
          path: '/getAllActive',
          handler: function (request, reply) {
            request.server.methods.pg.tags.getAllActive(function (error, allTags) { //eslint-disable-line
              return reply(allTags);
            });
          }
        }, {
          method: 'GET',
          path: '/addTags',
          handler: function (request, reply) {
            request.server.methods.pg.tags.addTags('challenges', 1, [1, 2],function (error, added) { //eslint-disable-line
              Hoek.assert(!error, error);

              return reply(added);
            });
          }
        }, {
          method: 'GET',
          path: '/getTagsForEdit',
          handler: function (request, reply) {
            var table = request.query.tableName;
            var id = request.query.id;

            request.server.methods.pg.tags.getTagsForEdit(table, id, function (error, allTags) { //eslint-disable-line
              Hoek.assert(!error, error);

              return reply(allTags);
            });
          }
        }
        ]);

        return callback(null, server, pool);
      });
    });
  });
}


module.exports = init;
