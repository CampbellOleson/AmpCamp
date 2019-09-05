import React from "react";
import StyledDropZone from "./StyledDropzone";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import { Query, compose, graphql } from "react-apollo";
import ReactAudioPlayer from "react-audio-player";
import "./ArtistShow.css";
const FAPI = require("../../util/fapi");
const { FETCH_ARTIST } = Queries;
const { UPDATE_BANNER_PHOTO } = Mutations;

class ArtistShow extends React.Component {
  constructor(props) {
    super(props);
    this.song = null;
    this.bannerImage = null;
    this.state = {
      newSong: false,
      update: false
    };
    this.pickSong = this.pickSong.bind(this);
    this.submitBannerPhoto = this.submitBannerPhoto.bind(this);
    this.imageDrop = this.imageDrop.bind(this);
  }

  // componentDidMount() {
  //   debugger;

  // this.setState({song: 'data.user.albums[0].songs[0].audioUrl'})
  // }
  // componentDidUpdate() {
  //   debugger;
  //   // if (this.bannerImage)
  // }

  pickSong(e, song) {
    // let rSong = songs[Math.floor(Math.random() * songs.length)];
    // this.setState({song: rSong})
    e.preventDefault();
    this.song = song;
    this.setState({ newSong: !this.state.newSong });
  }

  imageDrop(bannerPhoto) {
    // debugger;
    this.bannerImage = bannerPhoto;
    // this.setState({update: (!this.state.update)})
  }

  async submitBannerPhoto() {
    const bImage = this.bannerImage;
    const formData = new FormData();
    formData.set("image", bImage);
    const res = await FAPI.uploadImage(formData);
    console.log(res.data.imageUrl);
    // debugger;
    await this.props.updateBannerPhoto({
      variables: {
        id: this.props.match.params.id,
        bannerPhoto: res.data.imageUrl
      }
    });
    // this.setState({update: (!this.state.update)})
  }

  render() {
    return (
      <Query
        query={FETCH_ARTIST}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, err, data }) => {
          if (loading) return (
                         <div class="lds-roller">
                           <div></div>
                           <div></div>
                           <div></div>
                           <div></div>
                           <div></div>
                           <div></div>
                           <div></div>
                           <div></div>
                         </div>
                       );
          if (err) return `Error! ${err.message}`;
          if (!data) return null;
          // debugger;
          let albums;
          let displayedSongs;
          let songsArr = [];
          let bPhoto;
          albums = data.user.albums.map(album => {
            album.songs.forEach(song => songsArr.push(song));
            return (
                <div key={album._id} className="album-list-item-container">
                  <img
                    className="album-cover-art"
                    width="160px"
                    height="160px"
                    src={album.coverPhotoUrl}
                  />
                  <br/>
                  <div className='artist-show-album-info'>
                    {album.title}
                    <br/>
                    by: {album.by}
                  </div>
                </div>
            );
          });
          displayedSongs = songsArr.map(song => (
            <div className="song-list-item-container">
              <li key={song._id}>
                Song Title: {song.title}
                Artist: {song.artist.username}
              </li>
              <button className='song-play-button'onClick={e => this.pickSong(e, song)}></button>
            </div>
          ));
          if (songsArr.length > 0 && this.song === null) {
            this.song = songsArr[Math.floor(Math.random() * songsArr.length)];
          }

          bPhoto =
            data.user.bannerPhoto === null ? (
              <div>
                <StyledDropZone fileDrop={this.imageDrop} />
                <button onClick={this.submitBannerPhoto}>
                  Upload your banner photo!!
                </button>
              </div>
            ) : (
              <img
                className="artist-show-banner-image"
                src={data.user.bannerPhoto}
              />
            );

          return (
            <div className="artist-show-page-container">
              <div className="banner-photo-container">{bPhoto}</div>
              <div className='main-page-container'>
              <h2 className="artist-show-page-title">{data.user.username}</h2>
              <div className="audio-player-element">
                <span className='currently-playing'>Currently Playing: {this.song.title}</span>
                <ReactAudioPlayer className='audio-player' src={this.song.audioUrl} autoPlay controls />
              </div>
              <div className="artist-show-albums-container">
                {albums}
              </div>
              <div className="artist-show-songslist-container">
                <ul>{displayedSongs}</ul>
              </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  // graphql(FETCH_ARTIST, {name: 'fetchArtist'}),
  graphql(UPDATE_BANNER_PHOTO, { name: "updateBannerPhoto" })
)(ArtistShow);
