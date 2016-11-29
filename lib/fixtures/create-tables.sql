-- Create table tags
CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL
);

-- Create table categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  active BOOLEAN NOT NULL
);

-- Create table tags-category
CREATE TABLE IF NOT EXISTS tags_categories (
  tags_id INTEGER REFERENCES tags (id),
  categories_id INTEGER REFERENCES categories (id),
  PRIMARY KEY (tags_id, categories_id)
);
