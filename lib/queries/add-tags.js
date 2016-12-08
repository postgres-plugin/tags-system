'use strict';

/**
* Removes then adds tags to an item
* stored in a link table: tags_TABLENAME table
**/

// addTags('challenges', 0, [0, 3, 9])
// adds following pairs to the tags_challenges table:
// challenges_id | tag_id
// 0             | 0
// 0             | 3
// 0             | 9

function addTags (tableName, itemId, tagIds) {
  var linkTableName = 'tags_' + tableName; //  tags_challenges  or   tags_organisations
  var linkColumnName = tableName + '_id';  //  challenges_id    or   organisations_id
  var values;
  var deleteQuery = 'DELETE FROM ' + linkTableName + ' WHERE '
    + linkColumnName + ' = ' + itemId + ';';

  if (tagIds.length === 0) {
    return deleteQuery;
  }

  values = tagIds.map(function (tagId) {
    return '(' + tagId + ', ' + itemId + ')';
  }).join(',');

  return deleteQuery + 'INSERT INTO ' + linkTableName
    + ' (tags_id, ' + linkColumnName + ') VALUES ' + values + ';';
}

module.exports = addTags;
