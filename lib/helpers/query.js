'use strict';

/**
* Execute a postgres query
**/

module.exports = function (query, pool, cb) {
  pool.connect(function (poolError, client, done) {
    if (poolError) {
      return cb(poolError, null);
    }

    return client.query(query, function (error, response) {
      var result = null;

      if (error) {
        done();

        return cb(error, null);
      }

      result = response && response.rows;
      done();

      return cb(null, result);
    });
  });
};
