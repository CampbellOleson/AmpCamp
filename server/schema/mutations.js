const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require('mongoose');
require('../models/index');
const UserType = require('./types/user_type');
const User = mongoose.model('users');
const Album = mongoose.model("albums");
const Song = mongoose.model("songs");
const AlbumType = require("./types/album_type");
const SongType = require("./types/song_type");
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        register: {
            type: UserType,
            args: {
                username: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString}
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
            args:{
                username: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(_, args){
                return AuthService.login(args)
            }
        },
        verifyUser: {
            type: UserType,
            args: {
                token: { type: GraphQLString} 
            },
            resolve(_, args){
                return AuthService.verifyUser(args)
            }
        },
        // newAlbum: {
      //   type: AlbumType,
      //   args: {
      //     title: { type: GraphQLString },
      //     description: { type: GraphQLString },
      //     by: { type: GraphQLString },
      //     coverPhotoUrl: { type: GraphQLString },
      //     artist: { type: GraphQLID }
      //   },
      //   resolve(_, { title, description, by, coverPhotoUrl, artist }) {
      //     const album = new Album({
      //       title,
      //       description,
      //       by,
      //       coverPhotoUrl,
      //       artist
      //     }).save();
      //     album.associateArtist(album._id, artist);
      //     return album;
      //   }
      // },
    // newSong: {
    //   type: SongType,
    //   args: {
    //     title: { type: GraphQLString },
    //     audioUrl: { type: GraphQLString },
    //     artist: { type: GraphQLID },
    //     album: { type: GraphQLID }
    //   },
    //   resolve(_, { title, audioUrl, artist, album }) {
    //     new Song({ title, audioUrl, artist, album }).save().then(song => {
    //       song.associateAlbum(song._id, album);
    //       return song;
    //     });
    //   }
    // }
    }
});    

module.exports = mutation;
