-- Delete table

DROP TABLE IF EXISTS tags;

-- Create table
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL
);