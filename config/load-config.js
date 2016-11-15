'use strict';

/**
* Create default config or use the environment variables if defined
*/
require('env2')('.env');

module.exports = {
  user: process.env.PG_USER || 'postgres',
  database: process.env.PG_DATABASE || 'tags',
  password: process.env.PG_PASSWORD || '',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
