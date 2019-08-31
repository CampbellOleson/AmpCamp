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

AlbumSchema.statics.associateArtist = (album, artist) => {

};

module.exports = mongoose.model("albums", AlbumSchema);
