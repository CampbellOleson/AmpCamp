
// Auth Setup //

1. Setup index js to use express
2. create config/keys.js and connect the mongo DB key
3. git ignore /config and /node_modules
4. create server/server.js connect mongo db ( review newUrlParser: true)
5. run node index.js to test server
6. create a user model in server/models/user
7. create a server/models/index.js file and import all your models so you can 
import them in another file in one go.
8. npm install graphql express-graphql
9. create a graphql schema to allow you to communicate with the DB.
10. create server/schema/types/user_type.js and require graphql
11. create schema/types/root_queries.js and configure a root query to fetch all users or a single user. 

11. create a schema/schema.js and import your root query and use it to build a schema.
12. configure the server to run expressGraphQL middleware

schema.js

const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const query = require("./types/root_query_type");
 module.exports = new GraphQLSchema({query});
 

 13. npm install nodemon and add a dev script to your package.json:

 "scripts": {
    "dev": "nodemon index.js"
},

14. schema directory, create a new file called mutations.js

15. adda secretOrKey field in keys.js and generate a secret key with which to sign our user's web tokens for authentication

16. Within your server directory, create a new folder called validation

17. Create a new file in validation called valid-text.js

18. create register and login with the validation folder

19. create the validations for a user login / register in validations folder

20. Create a new folder in your server directory called services. 
Within services, create a new file called auth.js

21.