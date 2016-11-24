# tags-system
[![Build Status](https://travis-ci.org/postgres-plugin/tags-system.svg?branch=master)](https://travis-ci.org/postgres-plugin/tags-system)
[![codecov](https://codecov.io/gh/postgres-plugin/tags-system/branch/master/graph/badge.svg)](https://codecov.io/gh/postgres-plugin/tags-system)

tags-system is an Hapi plugin which allow you to use tags on your application. When registered to a Hapi server the plugin will automatically create the tables tag, categories and tags_categories in Postgres:

### Tags

| field  | data-type    |
| --------------------- |
| id     | integer      |
| name   | varchar(50)  |
| active | boolean      |

### categories

| field  | data-type    |
| --------------------- |
| id     | integer      |
| name   | varchar(50)  |
| active | boolean      |

### tags_categories


| field    | data-type     |
| ------------------------ |
| tags_id        | integer |
| categories_id  | integer |

The tags-system plugin take also an option where the content of these tables can be passed. This allow to initialise quickly the tables:

### plugin options:
```
{
  tags: require('./data/tags.json') // the json file which Initialise the tags database
  categories: require(./data/categories.json) // the json file which Initialise the categories
  pool: the_postgres_pool
}
```

# Fonctionalities

# how

- Install the package ```npm install tags-system --save```
- Create a json file on your app which represent the tags
- register the plugin in your app:
```
server.register([
    { register: require('tags-postgres'), options: options }
], function () {
    server.route(routes);
    server.start();
});
```

For a complete example you can have a look at the example folder of this plugin.

## Why??

- independent system, just require this plugin instead of creating a new tags system in your app
- works with your existing project and database. Adding a tag will create the right table and element in Postres without intefering with your existing database

## Questions?

Have a look at the [issues](https://github.com/postgres-plugin/tags-system/issues)
