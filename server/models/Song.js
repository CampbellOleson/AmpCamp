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

SongSchema.statics.associateAlbum = (songId, albumId) => {
  const Album = mongoose.model("albums");
  Album.findById(albumId).then(album => {
    album.songs.push(songId);
    album.save();
  });
};

module.exports = mongoose.model("songs", SongSchema);
