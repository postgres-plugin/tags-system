'use strict';

module.exports = 'select'
 + ' categories.name as category_name,'
 + ' categories.id as category_id,'
 + ' tags.name as tag_name,'
 + ' tags.id as tag_id'
 + ' from categories'
 + ' join tags_categories on categories.id = tags_categories.categories_id'
 + ' join tags on tags_categories.tags_id = tags.id'
 + ' where categories.active = true AND tags.active = true'
 + ' order by categories.name, tags.name;';
