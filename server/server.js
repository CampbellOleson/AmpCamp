const express = require("express");
const Models = require("./models/index");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
const expressGraphQL = require("express-graphql");
const app = express();
const schema = require("./schema/schema");

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB... DUH");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

module.exports = app;
