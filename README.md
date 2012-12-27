Nodepad
=============

A really simple notepad application written in node.js with a PostgreSQL used for data storage

Install dependencies
-------

    npm install


Configuration
-------

Configuration is done via environment variables. All possible variables are documented in the included _env.sample_ file.


Database schema
-------

To create the tables and load some example data, execute the _data/schema.sql_ file. This creates all the needed table and a single user with the username "user" and the password "password". Password is crypted with SHA1 algorithm
