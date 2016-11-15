'use strict';

/**
* Convert an array of tags object to a sql insert command
* [{id: 1, name: 'tag1', active: true}, {id: 2, name: 'tag2', active: false}]
* will be converted to
* INSERT INTO tags (id, name, active) VALUES
  (1, 'tag1', true),
  (2, 'tag2', false)
*/

module.exports = function (tags) {
  var result = '';
  var tagValues = '';

  if (tags.length > 0) {
    tagValues = tags.map(function (tag) {
      return '(' + tag.id + ' ,\'' + tag.name + '\', ' + tag.active + ')';
    }).join(',');

    result = 'INSERT INTO tags (id, name, active) VALUES ' + tagValues;
  }

  return result;
};
