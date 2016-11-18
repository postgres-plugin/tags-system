-- Delete table
DROP TABLE IF EXISTS tags_challenges;

CREATE TABLE IF NOT EXISTS tags_challenges (
  tags_id INTEGER,
  challenges_id INTEGER
);