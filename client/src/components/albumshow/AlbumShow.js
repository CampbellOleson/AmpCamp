import React from "react";
import Queries from "../../graphql/queries";
import "../generalshow/BannerPhoto.css";
import "../generalshow/PlaybarNav.css";
import "../generalshow/SongList.css";
import "./AlbumShow.css";
import { SongIndexItem, SongListHeader } from "../generalshow/SongIndexItem";
import Spinner from "../Spinner";
import BannerPhoto from "../generalshow/BannerPhoto";
import PlaybarNav from "../generalshow/PlaybarNav";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
const { FETCH_ALBUM } = Queries;

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
    this.song = null;
    this.pickSong = this.pickSong.bind(this);
    this.state = {
      currentlyPlaying: false
    };
  }

  pickSong(e, song) {
    e.preventDefault();
    this.song = song;
    this.setState({ currentlyPlaying: !this.state.currentlyPlaying });
  }

  render() {
    return (
      <Query query={FETCH_ALBUM} variables={{ id: this.props.match.params.id }}>
        {({ loading, err, data }) => {
          if (loading) return <Spinner />;
          if (err) return `Error! ${err.message}`;
          if (!data) return null;
          let bPhoto;
          let songsArr = [];
          let dispSongs;
          dispSongs = data.album.songs.map(song => {
            songsArr.push(song);
            return (
              <SongIndexItem
                song={song}
                pickSong={this.pickSong}
                album={data.album}
                type="album"
              />
            );
          });
          if (songsArr.length > 0 && this.song === null) {
            this.song = songsArr[Math.floor(Math.random() * songsArr.length)];
          }
          return (
            <div className="artist-show-page-container">
              <BannerPhoto
                bannerPhoto={data.album.artist.bannerPhoto}
                imageDrop={this.imageDrop}
                submitBannerPhoto={this.submitBannerPhoto}
              />
              <div className="album-title">{data.album.title}</div>
              <div className="main-page-container">
                <div className="album-main-page-vertical-container">
                  <div className="audio-player-element">
                    <PlaybarNav song={this.song} album={data.album} />
                  </div>
                  <div className="album-show-column">
                    <div>
                      <div className="album-by">
                        <p id="by-text">by</p>
                        <Link to={`/artist/${data.album.artist._id}`}>
                          {data.album.by}
                        </Link>
                      </div>
                      <div className="album-description">
                        {data.album.description}
                      </div>
                    </div>
                    <div className="album-song-list-item-container">
                      <ul>{dispSongs}</ul>
                    </div>
                  </div>
                  <div className="album-show-column">
                    <div className="album-show-cover-art-container">
                      <img
                        src={data.album.coverPhotoUrl}
                        className="album-show-cover-art"
                        alt="wtf where is the photo"
                      />
                    </div>
                  </div>
                </div>
                <div className="artist-info-column">
                  <p>{data.album.artist.username}</p>
                  <div className="artist-profile-photo" />
                  <p>Artist bio</p>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AlbumShow;
