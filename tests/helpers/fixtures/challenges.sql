-- Delete table
DROP TABLE IF EXISTS tags_challenges;
DROP TABLE IF EXISTS challenges;

-- Create table
CREATE TABLE IF NOT EXISTS challenges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  org_id INTEGER NOT NULL,
  creator_id INTEGER NOT NULL,
  active BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS tags_challenges (
  tags_id INTEGER REFERENCES tags (id),
  challenges_id INTEGER REFERENCES challenges (id)
);

INSERT INTO challenges (
  id, title, description, date, org_id, creator_id, active
) VALUES
  ( 0, 'first challenge', 'first description', '2016-01-01', 0, 0, true ),
  ( 1, 'second challenge', 'second description', '2016-01-01', 0, 0, true ),
  ( 2, 'third challenge', 'third description', '2016-01-01', 0, 0, false ),
  ( 3, 'fourth challenge', 'fourth description', '2016-01-01', 1, 1, true ),
  ( 4, 'fifth challenge', 'fifth description', '2016-01-01', 1, 1, true ),
  ( 5, 'sixth challenge', 'sixth description', '2016-01-01', 1, 1, false )
;

INSERT INTO tags_challenges (tags_id, challenges_id) VALUES (1, 0),(2, 0),(3, 0),(2, 1),(4, 1),(1, 3),(2, 3),(3, 3),(4, 3);
-- Challenge 0 linked to 1, 2, 3
-- Challenge 1 linked to 2, 4
-- Challenge 2 linked to 1, 2, 3, 4
