'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var pg = require('pg');

// plugins
var tags = require('../lib/index.js');
var people = require('pg-people');
var challenges = require('pg-challenges');

// data
var tagsData = require('./data/tags.json');
var categoriesData = require('./data/categories.json');
var peopleData = require('./data/people.json');
var organisationsData = require('./data/organisations.json');
var tagsOrgsData = require('./data/tags_organisations.json');
var challengesData = require('./data/challenges.json');
var tagsChallengesData = require('./data/tags_challenges.json');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);

  var optionsTags = {
    reset: true,
    tags: tagsData,
    categories: categoriesData,
    pool: pool
  };
  var optionsPeople = {
    pool: pool,
    reset: true,
    people: peopleData,
    organisations: organisationsData,
    tags_organisations: tagsOrgsData
  };
  var optionsChallenges = {
    pool: pool,
    reset: true,
    challenges: challengesData,
    tags_challenges: tagsChallengesData
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
      register: people,
      options: optionsPeople
    }, function (errorPeople) {
      if (errorPeople) {
        console.log('people', errorPeople); // eslint-disable-line

        return callback(errorPeople);
      }

      return server.register({
        register: challenges,
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
              Hoek.assert(!error, 'error /addTags endpoint');

              return reply(added);
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
