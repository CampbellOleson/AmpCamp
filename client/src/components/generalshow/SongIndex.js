import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import ReactAudioPlayer from "react-audio-player";
const { FETCH_SONGS } = Queries;
class SongIndex extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <Query query={FETCH_SONGS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="song-index">
              <ReactAudioPlayer
                src="https://ampcamp3910.s3.us-east-2.amazonaws.com/1567542526064"
                controls
              />
              <ul>
                {data.songs.map(song => (
                  <ul>
                    <li key={song._id}></li>
                    <li>title: {song.title}</li>
                    <br />
                    <li>audioUrl: {song.audioUrl}</li>
                    <br />
                    <li>album: {song.album.title}</li>
                    <br />
                    <li>artist: {song.artist.username}</li>
                    <br />
                    <li>artist - test: {song.album.artist.username}</li>
                    <br />
                    <li>album-cover-photo: {song.album.coverPhotoUrl}</li>
                    <br />
                    <li>album - description: {song.album.description}</li>
                    <br />
                    <li>album-by: {song.album.by}></li>
                    <br />
                  </ul>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default SongIndex;
