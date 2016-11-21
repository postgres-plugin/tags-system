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
  + 'tags.id AS id_tag, tags.name AS name_tag, '
  + 'categories.name AS name_cat, categories.id AS id_cat '
  + 'FROM tags_' + tableName + ' '
  + 'RIGHT OUTER JOIN tags ON '
  + 'tags_' + tableName + '.' + tableName + '_id = ' + id + ' '
  + 'AND tags_' + tableName + '.tags_id = tags.id '
  + 'LEFT OUTER JOIN tags_categories ON '
  + 'tags.id = tags_categories.id_tag '
  + 'LEFT OUTER JOIN categories ON '
  + 'tags_categories.id_category = categories.id '
  + 'WHERE '
  + 'tags.active = TRUE AND categories.active = TRUE;';
};

/*

SELECT
  CASE WHEN tags_challenges.challenges_id = 0 THEN TRUE ELSE FALSE END
    AS selected,
  tags.id AS tag_id, tags.name AS tag_name,
  categories.name AS cat_name
  FROM tags_challenges
  RIGHT OUTER JOIN tags ON
    tags_challenges.challenges_id = 0
    AND tags_challenges.tags_id = tags.id
  LEFT OUTER JOIN tags_categories ON
    tags.id = tags_categories.id_tag
  LEFT OUTER JOIN categories ON
    tags_categories.id_category = categories.id
  WHERE
    tags.active = TRUE AND categories.active = TRUE;

*/
