'use strict';

/**
* Convert an array of categories object to a sql insert command
* [{id: 1, name: 'cat 1', active: true}, {id: 2, name: 'cat 2', active: false}]
* will be converted to
* INSERT INTO tags (id, name, active) VALUES
  (1, 'cat 1', true),
  (2, 'cat 2', false)
*/

module.exports = function (categories) {
  var result = '';
  var CatValues = '';

  if (categories.length > 0) {
    CatValues = categories.map(function (cat) {
      return '(' + cat.id + ' ,\'' + cat.name + '\', ' + cat.active + ')';
    }).join(',');

    result = 'INSERT INTO categories (id, name, active) VALUES '
           + CatValues + ';';
  }

  return result;
};
