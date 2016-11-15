'use strict';

/**
* Return all the tags
**/

module.exports = function (pool, cb) {
  var query = 'select id, name, active from tags order by name';

  pool.connect(function (poolError, client, done) {
    client.query(query, function (error, response) {
      if (error) {
        return cb(error);
      }
      done();

      return cb(error, response.rows);
    });
  });
};
