'use strict';

/**
* Add tags to an item, stored in a tags_TABLENAME table
**/

// addTags('challenges', 0, [0, 3, 9])
// adds following pairs to the tags_challenges table:
// challenges_id | tag_id
// 0             | 0
// 0             | 3
// 0             | 9

function addTags (tableName, itemId, tagIds) {
  var columnName = tableName + '_id';
  var values = tagIds.map(function (tagId) {
    return '(' + tagId + ', ' + itemId + ')';
  }).join(',');

  return 'INSERT INTO tags_' + tableName + ' (tags_id, ' + columnName + ') '
    + 'VALUES ' + values + ';';
}

module.exports = addTags;
