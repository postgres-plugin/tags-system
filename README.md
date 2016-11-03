# tags-system

This document is a draft which contains ideas and first thoughts on how to build a reusable tags-system.

# Tools

- PostgreSQL to store the tags
- Hapi plugin

# MVP features

- [ ] Initialise a "tags" table which contains all the tags. A json file can be used to create easily the first content of the table:

```
[
  {
    tag-name: 'documentation',
    active: true
  },
  {
    tag-name: 'question',
    active: true
  },
  {
    tag-name: 'bug',
    active: true
  }
]
```
- [ ] Provide a addTag function to the Hapi route handlers:

```
addTag('type_element_tagged', 'id_element', 'name_of_tag')
```
A first idea how to use it on a Hapi handler:

```
function (request, reply) {
  request.addTag('issue', '42' 'bug')
}
```

The addTag function will check if the 'type_element_tagged' already exists in PostgreSQL and add a new entry which link the id of the element with the id of the tag.

- [ ] Provide a getTags function which get all the tags linked to an element:

```
getTags('type_element_tagged', 'id_element', callback)
```
In the Hapi handlers

```
function (request, reply) {
  request.getTags('issue', '42', function (error, tags){
     console.log(tags);
     return reply.view('issue', {listTags: tags});  
  })
}
```

# how

- Install the package ```npm install tags-postgres --save```
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

where options is

```
{
  tags: require('tags.json') // the json file which Initialise the tags database
  dbConnection: the_postgres_url
}
```

# Why??

- independent system, just require this plugin instead of creating a new tags system in your app
- works with your existing project and database. Adding a tag will create the right table and element in postres without intefering with your existing database

# Questions?

- Is adding a function to the request object the best way to provide functionality everywhere on the Hapi app?


# Next iteration


- Create UI to add and delete tags instead of using a json config file. **This will require to have an authentication system to allow only specific users to modify the tags table.**