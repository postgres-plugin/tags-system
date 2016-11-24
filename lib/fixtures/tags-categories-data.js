'use strict';

/**
* Convert an array of tags-categories object to a sql insert command
*/

module.exports = function (tags) {
  var result = '';
  var values = [];

  if (tags.length > 0) {
    tags.forEach(function (tag) {
      tag.categories.forEach(function (idCat) {
        values.push('(' + tag.id + ', ' + idCat + ')');
      });

      result = 'INSERT INTO tags_categories (id_tag, id_category) VALUES '
               + values.join(',') + ';';
    });
  }

  return result;
};
