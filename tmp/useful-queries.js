/*
Get tags for edit query

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
