const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  by: {
    type: String
  },
  coverPhotoUrl: {
    type: String,
    required: true
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "songs"
    }
  ],
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artist"
  }
});

AlbumSchema.statics.associateArtist = (albumId, artistId) => {
  const User = mongoose.model("users");
  User.findById(artistId).then(artist => {
    artist.albums.push(albumId);
    artist.save();
  });
};

module.exports = mongoose.model("albums", AlbumSchema);
