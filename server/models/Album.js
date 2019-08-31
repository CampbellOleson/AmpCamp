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
  },
  by: {
    type: String
  }
});

module.exports = mongoose.model("albums", AlbumSchema);