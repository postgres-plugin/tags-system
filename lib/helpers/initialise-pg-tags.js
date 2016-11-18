'use strict';

/**
* if not already defined add pg.tags object
*/

module.exports = function (request) {
  if (request.pg) {
    request.pg.tags = {};
  } else {
    request.pg = { tags: {} };
  }

  return request;
};
