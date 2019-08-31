const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = Schema({
  title: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "album"
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artist"
  }
});



module.exports = mongoose.model("songs", SongSchema);
