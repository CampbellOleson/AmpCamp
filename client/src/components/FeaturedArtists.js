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
      // debugger;
      return (
        <div className="featured-artists-container">
          {albums.map(album => {
            //   album.songs[Math.floor(Math.random() * album.songs.length)];
            // song = album.songs[Math.floor(Math.random() * album.songs.length)];
            let song = album.songs[0]
            if (song === undefined) {
              song = { _id: 'undefined' }
            }
            //   console.log(song)
            //   const song = album.songs[Math.floor(Math.random() * album.songs.length)];
            return (
              <div className="featured-artists--item">
                <div className="album-image-container-home">
                  <img
                    className="home-page-album-art"
                    src={album.coverPhotoUrl}
                  />
                  <button
                    onClick={event => this.playSong(event, song)}
                    id={`${song._id}`}
                    className="play-button"
                  >
                    <div></div>
                  </button>
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
    let id = song._id.toString();
    let element = document.getElementById(id);

    let pausedArray = document.getElementsByClassName('pause');
 


    if (pausedArray.length > 0) { 
      for (let i = 0; i < pausedArray.length; i++) {
   
        let el = pausedArray[i];
        if (el !== event.target) {

          el.classList.toggle('pause');
          el.classList.toggle('play-button');
        }
      }
    }
    if (mountedSong === song.audioUrl && this.playing === true) { 

      this.rap.audioEl.pause();

      element.classList.toggle("play-button");
      element.classList.toggle("pause");


      this.playing = false;
    } else if (mountedSong === song.audioUrl && this.playing === false) {
      // debugger;

      this.rap.audioEl.play();
      element.classList.toggle("pause");
      element.classList.toggle("play-button");

      this.playing = true;
    } else {
      this.song = song.audioUrl;
      this.playing = true;
      this.setState({ update: (!this.state.update) });
      element.classList.toggle("pause");
      element.classList.toggle("play-button");
    }
  }

  render() {
    if (this.props.data) {
      return (
        <div>
          <div>
            {this.renderFeaturedArtists(this.props.data)}
            <ReactAudioPlayer className='home-page-audio-player'
              ref={element => {
                this.rap = element;
              }}
              autoPlay
              src={this.song}
              controls
            />
          </div>
        </div>
      );
    }
  }
}

export default FeaturedArtists;
