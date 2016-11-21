'use strict';

/**
* Convert the active categories and tags rows to an object
*  [
*    { name_cat: 'Cat 2', id_cat: 2, name_tag: 'frank', id_tag: 2 },
*    { name_cat: 'Cat 3', id_cat: 3, name_tag: 'flip', id_tag: 4 }
*  ]
* to:
*{
*  "2": {
*  "id_cat":2,
*  "name_cat":"Cat 2",
*  "tags":{
*    "2":{
*      "id_tag":2,
*      "name_tag":"frank"
*    }
*  }
*  },
*  "3":{
*  "id_at":3,
*  "name_cat":"Cat 3",
*  "tags":{
*    "4":{
*      "id_tag":4,
*      "name_tag":"flip"
*    }
*   }
*  }
*}
*/

module.exports = function (rows) {
  var result = {};

  rows.forEach(function (active) {
    if (!result[active.id_cat]) {
      result[active.id_cat] = {
        id_cat: active.id_cat,
        name_cat: active.name_cat,
        tags: {}
      };
    }
    result[active.id_cat].tags[active.id_tag] = {
      id_tag: active.id_tag,
      name_tag: active.name_tag,
      selected: active.selected
    };
  });

  return result;
};
