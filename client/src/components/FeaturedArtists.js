import React from "react";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import "./FeaturedArtists.css";
import { Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
const { FETCH_ALBUMS_AND_ARTISTS } = Queries;

class FeaturedArtists extends React.Component {
  constructor(props) {
    super(props);
    this.renderFeaturedArtists = this.renderFeaturedArtists.bind(this);
    this.playSong = this.playSong.bind(this);
    this.song = null;
    this.playing = false;
    this.state = {
      update: null,
    };
  }

  renderFeaturedArtists() {
    const { albums } = this.props.data;
    // const song = album.songs[0];
    if (albums) {
        return (
            <div className="featured-artists-container">
          {albums.map(album => {
              //   album.songs[Math.floor(Math.random() * album.songs.length)];
              // song = album.songs[Math.floor(Math.random() * album.songs.length)];
              const song = album.songs[0]
            //   const song = album.songs[Math.floor(Math.random() * album.songs.length)];
            return (
              <div className="featured-artists--item">
                <div className="album-image-container-home">
                  <img
                    className="home-page-album-art"
                    src={album.coverPhotoUrl}
                    onClick={event => this.playSong(event, song)}
                  />
                  <div className="play-button">
                    <div></div>
                  </div>
                </div>
                <Link to={`/artist/${album.artist._id}`}>
                  <h4>{album.title}</h4>
                </Link>
                <Link to={`/artist/${album.artist._id}`}>
                  <h4>by {album.by}</h4>
                </Link>
              </div>
            );
          })}
        </div>
      );
    }
  }

  playSong(event, song) {
    event.preventDefault();
    let mountedSong = this.rap.audioEl.src.toString();
    // this.song = song;
    // debugger;
    if (mountedSong === song.audioUrl && this.playing === true) {
        this.rap.audioEl.pause();
        // this.setState({ playing: false })
        this.playing = false;
    } else if (mountedSong === song.audioUrl && this.playing === false) {
        this.rap.audioEl.play();
        // this.setState({ playing: true });
        this.playing = true;
    } else {
      this.song = song.audioUrl;
      this.playing = true;
      this.setState({ update: (!this.state.update) });
    }
  }

  render() {
    if (this.props.data) {
      return (
        <div>
          <div>
            {this.renderFeaturedArtists(this.props.data)}
            <ReactAudioPlayer
              ref={element => {
                this.rap = element;
              }}
              src={this.song}
              autoPlay
              controls
            />
          </div>
        </div>
      );
    }
  }
}

export default FeaturedArtists;
