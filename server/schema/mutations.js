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
// const s3PayloadType = require("./types/s3_type.js");
// const s3Bucket = require('../../config/keys').S3_BUCKET;
// const aws = require("aws-sdk");

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
        const song = await new Song({ title, audioUrl, artist, album }).save();
        Song.associateAlbum(song._id, album);
        return song;
      }
    },
    updateBannerPhoto: {
      type: UserType,
      args: {
        _id: {type: GraphQLID},
        bannerPhoto: {type: GraphQLString}
      },
      async resolve(_, { _id, bannerPhoto }) {
        const user = await User.findOneAndUpdate({"_id": _id}, {"$set": {bannerPhoto: bannerPhoto}});
        return user
      }
    },
    deleteAlbum: {
      type: AlbumType,
      args: {
        _id: {type: GraphQLID}
      },
      async resolve(_, {_id}) {
        // const Album = mongoose.model("albums");
        // console.log(_id);
        await Album.removeAlbum(_id);
        Album.findOneAndDelete(_id);
  
      }
    }
    // signS3: {
    //   type: s3PayloadType,
    //   args: {
    //     filename: { type: GraphQLString },
    //     filetype: { type: GraphQLString }
    //   },
    //   async resolve(_, { filename, filetype }) {
    //     // AWS_ACCESS_KEY_ID
    //     // AWS_SECRET_ACCESS_KEY
    //     const s3 = new aws.S3({
    //       signatureVersion: "v4",
    //       region: "us-east-2"
    //     });
    //     // console.log(filename);
    //     // console.log(filetype);
    //     // console.log(s3Bucket);
    //     const s3Params = {
    //       Bucket: s3Bucket,
    //       Key: filename,
    //       Expires: 60,
    //       ContentType: filetype,
    //       ACL: "public-read"
    //     };

    //     const signedRequest = await s3.getSignedUrl("putObject", s3Params);
    //     const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
    //     console.log(signedRequest)
    //     console.log(url);
    //     return {
    //       signedRequest,
    //       url
    //     };
    //   }
    // }
  }
});

module.exports = mutation;

// Mutation: {
//   signS3: async (parent, {
//     filename,
//     filetype,
//   }) => {
//     // AWS_ACCESS_KEY_ID
//     // AWS_SECRET_ACCESS_KEY
//     const s3 = new aws.S3({
//       signatureVersion: 'v4',
//       region: 'us-east-2',
//     });

//     const s3Params = {
//       Bucket: s3Bucket,
//       Key: filename,
//       Expires: 60,
//       ContentType: filetype,
//       ACL: 'public-read',
//     };

//     const signedRequest = await s3.getSignedUrl('putObject', s3Params);
//     const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

//     return {
//       signedRequest,
//       url,
//     };
//   },
