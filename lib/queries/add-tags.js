'use strict';

/**
* Add tags to an item, stored in a tags_TABLENAME table
*
**/

// addTags('challenges', 0, [0, 3, 9])
// adds following pairs to the tags_challenges table:
// challenges_id | tag_id
// 0             | 0
// 0             | 3
// 0             | 9

function addTags (tableName, itemId, tagIds) {
  var columnName = tableName + '_id';

  return tagIds.map(function (tagId) {
    return 'INSERT INTO tags_' + tableName // tableName: tags_x
      + ' (tag_id, ' + columnName
      + ') VALUES (' + itemId + ', ' + tagId + '); ';
  }).join('');
}

module.exports = addTags;
