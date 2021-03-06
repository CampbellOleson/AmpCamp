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

AlbumSchema.statics.removeAlbum = async albumId => {
  const Album = mongoose.model("albums");
  const User = mongoose.model("users");
  const Song = mongoose.model("songs");
  await Album.findById(albumId).then(async album => {
    let newAlbumArray = [];
    // console.log('1', album.songs);
    await User.findById(album.artist).then(async user => {
      // console.log('2', user.albums)
      for (let i = 0; i < user.albums.length; i++) {
        if (!album._id.equals(user.albums[i])) {
          // console.log(`album to push: ${user.albums[i]}`);
          newAlbumArray.push(user.albums[i]);
        }
      }
      // console.log(`album array: ${newAlbumArray}`);
      user.albums = newAlbumArray;
      await user.save();
    });
    for (let i = 0; i < album.songs.length; i++) {
      // console.log(`song: ${album.songs[i]}`);
      await Song.findOneAndDelete({_id: album.songs[i]})
    }
    album.save();
  });
  // Album.findOneAndDelete(albumId).then(album => console.log(album));
};

module.exports = mongoose.model("albums", AlbumSchema);
