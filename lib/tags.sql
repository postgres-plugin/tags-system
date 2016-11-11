-- Check if 'tags' table exists already; create if not
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL
);

-- Delete all entries of the tags table
TRUNCATE tags;
