-- Check if 'tags' table exists already; create if not
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL
);

-- Check if a tag already exists in the table; add to table if not
INSERT INTO tags (id, name, active)
  SELECT id, name, active FROM tags
  UNION --Combine the results of the above queries
  VALUES (
    000001,
    'Member Type',
    true
  )
  EXCEPT
    SELECT id, name, active FROM tags;
