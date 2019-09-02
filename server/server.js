const express = require("express");
const Models = require("./models/index");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
const expressGraphQL = require("express-graphql");
const app = express();
const schema = require("./schema/schema");
const cors = require("cors");
const fileRoutes = require("./routes/file-upload");

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB... DUH");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use("/api", fileRoutes);

app.use(cors());

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   // req.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);

module.exports = app;
