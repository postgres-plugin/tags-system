'use strict';


/*
* We pass getByTag a table that we want get ('challenges') and a tag id
* that we want to filter by. This function should return all of the challenges
* that meet that contain that tag.
*/

/* eslint-disable */

module.exports = function getChallengesByTag (tagId) {
  return `SELECT
      tags.id AS tag_id, tags.name AS tag_name,
      challenges.id, challenges.date, challenges.title, challenges.description,
      challenges.creator_id, challenges.org_id
    from tags
    JOIN
      tags_challenges ON tags.id = ` + tagId + ` AND tags_challenges.tags_id = tags.id
    JOIN
    challenges ON tags_challenges.challenges_id = challenges.id;` //eslint-disable-line
}
