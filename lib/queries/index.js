'use strict';

var getTags = require('./get-tags.js');
var addTags = require('./add-tags.js');
var getChallengesByTag = require('./get-challenges-by-tag.js');
var getAllActive = require('./get-all-active.js');
var getTagsForEdit = require('./get-tags-for-edit.js');

module.exports = {
  getTags: getTags,
  getChallengesByTag: getChallengesByTag,
  addTags: addTags,
  getAllActive: getAllActive,
  getTagsForEdit: getTagsForEdit
};
