'use strict';

function tagString (tags) {
  return 'INSERT INTO tags (name, active) VALUES '
    + tags.reduce(function (str, tag, ind) {
      if (ind !== 0) {
        return str + ', (\'' + tag.name + '\', ' + tag.active + ')';
      }

      return str + '(\'' + tag.name + '\', ' + tag.active + ')';
    }, '');
}


function register (server, options, next) {
  options.tagsPool.connect(function (connErr, client, done) {
    if (connErr) {
      done();

      return next(connErr);
    }
    client.query(tagString(options.tags), function (queryErr) {
      if (queryErr) {
        done();

        return next(queryErr);
      }
      done();

      return next();
    });
  });
}

register.attributes = {
  name: 'tags',
  version: '1.0.0'
};


module.exports = register;
