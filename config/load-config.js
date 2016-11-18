'use strict';

/**
* Create default config or use the environment variables if defined
*/
var env = require('env2')('.env'); //eslint-disable-line


// DEFAULTS
var defaults = {
  port: process.env.PORT || 3000,
  pg: {
    user: process.env.PG_USER || 'postgres',
    database: process.env.PG_DATABASE || 'tags',
    password: process.env.PG_PASSWORD || '',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
  }
};

// TEST
var test = {
  port: process.env.PORT_TEST || 0,
  pg: {
    user: process.env.PG_USER_TEST || 'postgres',
    database: process.env.PG_DATABASE_TEST || 'tags_test',
    password: process.env.PG_PASSWORD_TEST || '',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
  }
};


function setUpConfig () {
  if (process.env.NODE_ENV === 'test') {
    return test;
  }

  return defaults;
}

module.exports = setUpConfig();
