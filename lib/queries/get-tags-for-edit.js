'use strict';

/**
*
* This query gets all active tags and belonging to active categories
* with the added functionality of adding a selected collumn which
* holds a TRUE if the challenge or organisation
* has that tag attached to it, otherwise 'selected' will contain FALSE
*
*/


module.exports = function getTagsForEdit (tableName, id) {
  return 'SELECT '
  + 'CASE WHEN tags_' + tableName + '.' + tableName + '_id = ' + id
  + ' THEN TRUE ELSE FALSE END '
  + 'AS selected, '
  + 'tags.id AS tag_id, tags.name AS tag_name, '
  + 'categories.name AS category_name, categories.id AS category_id '
  + 'FROM tags_' + tableName + ' '
  + 'RIGHT OUTER JOIN tags ON '
  + 'tags_' + tableName + '.' + tableName + '_id = ' + id + ' '
  + 'AND tags_' + tableName + '.tags_id = tags.id '
  + 'LEFT OUTER JOIN tags_categories ON '
  + 'tags.id = tags_categories.tags_id '
  + 'LEFT OUTER JOIN categories ON '
  + 'tags_categories.categories_id = categories.id '
  + 'WHERE '
  + 'tags.active = TRUE AND categories.active = TRUE '
  + 'ORDER BY '
  + 'categories.name, tags.name;';
};
