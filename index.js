
const register = function (server, options, next) {
  console.log('registering tags');
  server.route({
    method: 'GET',
    path: '/test',
    handler: function (request, reply) {
        return reply('ok');
    }
  });

  return next();
};

register.attributes = {
    name: 'tags',
    version: '1.0.0'
};


module.exports = register
