const mongoose = require("mongoose");
const graphql = require("graphql");
const Album = mongoose.model("albums");
const User = mongoose.model("users");
const UserType = require("./user_type");
const Song = mongoose.model("songs");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const AlbumType = new GraphQLObjectType({
  name: "AlbumType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    by: { type: GraphQLString },
    coverPhotoUrl: { type: GraphQLString },
    songs: {
      type: new GraphQLList(require("./song_type")),
      resolve(parentValue) {
        return Album.findById(parentValue._id)
          .populate("songs")
          .then(album => album.songs);
      }
    },
    artist: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.artist)
          .then(artist => artist)
          .catch(error => error);
      }
    }
  })
});

module.exports = AlbumType;
