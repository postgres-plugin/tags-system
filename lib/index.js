'use strict';

var runOnce = false;
// var hpc = require('hapi-postgres-connection');
var register = function (server, options, next) {
  server.ext('onPreAuth', function (request, reply) {
    if (!runOnce) {
      runOnce = true;
      console.log(options.hpc.getCon());
    }
    request.jackmisawesome = function () {
      return 'Abracadabra!';
    };
    reply.continue();
  });

  return next();
};

register.attributes = {
  name: 'tags',
  version: '1.0.0'
};

module.exports = register;
