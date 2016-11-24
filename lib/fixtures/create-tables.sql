-- Create table tags
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL
);

-- Create table categories
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL
);

-- Create table tags-category
CREATE TABLE IF NOT EXISTS tags_categories (
  id_tag INTEGER REFERENCES tags (id),
  id_category INTEGER REFERENCES categories (id),
  PRIMARY KEY (id_tag, id_category)
);
