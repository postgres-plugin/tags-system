'use strict';

/**
* Return all the tags
**/

module.exports = function (client, cb) {
  var query = 'select (id, name, active) from tags';

  client.query(query, function (error, response) {
    return cb(error, response);
  });
};
