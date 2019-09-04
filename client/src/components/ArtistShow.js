import React from "react";
import Queries from "../graphql/queries";
import { Query } from "react-apollo";
import ReactAudioPlayer from "react-audio-player";
import "./ArtistShow.css";
const { FETCH_ARTIST } = Queries;

class ArtistShow extends React.Component {
  constructor(props) {
    super(props);
    this.song = null;
    this.state = {
      newSong: false
    };
    this.pickSong = this.pickSong.bind(this);
  }

  //   componentDidMount() {
  //     debugger;
  //     // this.setState({song: 'data.user.albums[0].songs[0].audioUrl'})
  //   }

  pickSong(e, song) {
    // let rSong = songs[Math.floor(Math.random() * songs.length)];
    // this.setState({song: rSong})
    e.preventDefault();
    this.song = song;
    this.setState({ newSong: !this.state.newSong });
  }

  render() {
    return (
      <Query
        query={FETCH_ARTIST}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, err, data }) => {
          if (loading) return "Loading...Please Wait...";
          if (err) return `Error! ${err.message}`;
          if (!data) return null;
          
          let albums;
          let displayedSongs;
          let songsArr = [];
          albums = data.user.albums.map(album => {
            album.songs.forEach(song => songsArr.push(song));
            return (
              <div key={album._id} className="album-list-item-container">
                <ul>
                  <li>
                    Album Title: {album.title}
                    description: {album.description}
                    by: {album.by}
                    <img
                      width="130px"
                      height="130px"
                      src={album.coverPhotoUrl}
                    />
                  </li>
                </ul>
              </div>
            );
          });
          displayedSongs = songsArr.map(song => (
            <div key={song._id} className="song-list-item-container">
              <li>
                Song Title: {song.title}
                Artist: {song.artist.username}
              </li>
                <button onClick={(e) => this.pickSong(e, song)}>Play Song!!</button>
            </div>
          ));
          if (songsArr.length > 0 && this.song === null) {
            this.song = songsArr[Math.floor(Math.random() * songsArr.length)];
          }
          return (
            <div className="artist-show-page-container">
              <h2 className="artist-show-page-title">{data.user.username}</h2>
              <div className="audio-player-element">
                <span>Currently Playing: {this.song.title}</span>
                <ReactAudioPlayer src={this.song.audioUrl} autoPlay controls />
              </div>
              <div className="artist-show-albums-container">
                <ul>{albums}</ul>
              </div>
              <div className="artist-show-songslist-container">
                <ul>{displayedSongs}</ul>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ArtistShow;
