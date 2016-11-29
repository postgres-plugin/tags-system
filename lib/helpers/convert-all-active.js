'use strict';

/**
* Convert the active categories and tags rows to an object
*  [
*    { name_cat: 'Cat 2', category_id: 2, tags_name: 'frank', tags_id: 2 },
*    { name_cat: 'Cat 3', category_id: 3, tags_name: 'flip', tags_id: 4 }
*  ]
* to:
*{
*  "2": {
*  "category_id":2,
*  "name_cat":"Cat 2",
*  "tags":{
*    "2":{
*      "tags_id":2,
*      "tags_name":"frank"
*    }
*  }
*  },
*  "3":{
*  "id_at":3,
*  "name_cat":"Cat 3",
*  "tags":{
*    "4":{
*      "tags_id":4,
*      "tags_name":"flip"
*    }
*   }
*  }
*}
*/

function tagFromRow (row) {
  return {
    tag_id: row.tag_id,
    tag_name: row.tag_name,
    selected: row.selected
  };
}

function categoryFromRow (row) {
  return {
    category_id: row.category_id,
    category_name: row.category_name,
    tags: []
  };
}

module.exports = function (rows) {
  var order = [];

  var result = rows.reduce(function (object, row) {
    // if this is a new category
    if (!object[row.category_id]) {
      // add the id of the category to the order array
      order.push(row.category_id);
      // add the category to the object referenced by the category id
      object[row.category_id] = categoryFromRow(row);
    }

    object[row.category_id].tags.push(tagFromRow(row));

    return object;
  }, {});

  return order.map(function (cat_id) {
    return result[cat_id];
  });
};
