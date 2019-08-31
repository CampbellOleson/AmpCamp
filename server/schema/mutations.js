const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean
} = graphql;
const mongoose = require("mongoose");
require("../models/index");
const UserType = require("./types/user_type");
const User = mongoose.model("users");
const Album = mongoose.model("albums");
const Song = mongoose.model("songs");
const AlbumType = require("./types/album_type");
const SongType = require("./types/song_type");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        artist: { type: GraphQLBoolean }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    newAlbum: {
      type: AlbumType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        by: { type: GraphQLString },
        coverPhotoUrl: { type: GraphQLString },
        artist: { type: GraphQLID }
      },
      async resolve(_, { title, description, by, coverPhotoUrl, artist }) {
        const album = await new Album({
          title,
          description,
          by,
          coverPhotoUrl,
          artist
        }).save();
        Album.associateArtist(album._id, artist);
        return album;
      }
    },
    newSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
        audioUrl: { type: GraphQLString },
        artist: { type: GraphQLID },
        album: { type: GraphQLID }
      },
      async resolve(_, { title, audioUrl, artist, album }) {
        const song = await new Song({ title, audioUrl, artist, album }).save()
          Song.associateAlbum(song._id, album);
          return song;
        }
      }
    }
});

module.exports = mutation;
