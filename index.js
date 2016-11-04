const register = function (server, options, next) {
  server.ext('onPreAuth', function(request, reply) {
    request.jackmisawesome = function() {
      console.log('HI THERE');
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
