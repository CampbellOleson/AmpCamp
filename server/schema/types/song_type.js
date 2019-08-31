const mongoose = require("mongoose");
const graphql = require("graphql");
const Album = mongoose.model("albums");
const User = mongoose.model("users");
const UserType = require("./user_type");
const AlbumType = require("./album_type");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
// const Album = mongoose.model('albums')

const SongType = new GraphQLObjectType({
  name: "SongType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    audioUrl: { type: GraphQLString },
    album: {
      type: { AlbumType },
      resolve(parentValue) {
        return Album.findById(parentValue.album)
          .then(album => album)
          .catch(error => error);
      }
    },
    artist: {
      type: { UserType },
      resolve(parentValue) {
        return User.findById(parentValue.artist)
          .then(artist => artist)
          .catch(error => error);
      }
    }
  })
});

module.exports = SongType;
