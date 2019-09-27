import React from "react";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import "../generalshow/BannerPhoto.css";
import "../generalshow/PlaybarNav.css";
import "../generalshow/SongList.css";
import "./AlbumShow.css";
import { SongIndexItem, SongListHeader } from "../generalshow/SongIndexItem";
import Spinner from "../Spinner";
import { compose, graphql } from "react-apollo";
import BannerPhoto from "../generalshow/BannerPhoto";
import PlaybarNav from "../generalshow/PlaybarNav";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
const { FETCH_ALBUM } = Queries;
const { DELETE_ALBUM } = Mutations;

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
    this.song = null;
    this.destroyAlbum = this.destroyAlbum.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.pickSong = this.pickSong.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.state = {
      currentlyPlaying: false,
      deleteMode: false
    };
  }

  pickSong(e, song) {
    e.preventDefault();
    this.song = song;
    this.setState({ currentlyPlaying: !this.state.currentlyPlaying });
  }

  destroyAlbum(albumId) {
    return async () => {
      await this.props.deleteAlbum({ variables: { id: albumId } });
      this.props.history.push(
        `/artist/${localStorage.getItem("currentUserId")}`
      );
      this.toggleDeleteModal();
    };
  }

  toggleDeleteModal() {
    const opposite = !this.state.deleteMode;
    this.setState({ deleteMode: opposite });
    if (opposite) {
      document.querySelectorAll("DIV, P, IMG, A").forEach(el => {
        el.classList.add("modal-bg");
      });
    } else {
      document.querySelectorAll("DIV, P, IMG, A").forEach(el => {
        el.classList.remove("modal-bg");
      });
    }
  }

  deleteModal(album) {
    return this.state.deleteMode ? (
      <div className="album-delete-modal">
        <section>{`Are you sure you want to delete ${album.title}?`}</section>
        <p>There is no way to recover your album after you delete it</p>
        <div className="album-delete-modal-buttons">
          <button onClick={this.toggleDeleteModal}>Cancel</button>
          <button id="dbutton" onClick={this.destroyAlbum(album._id)}>
            Confirm
          </button>
        </div>
      </div>
    ) : null;
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
          dispSongs = data.album.songs.map((song, idx) => {
            songsArr.push(song);
            return (
              <SongIndexItem
                song={song}
                pickSong={this.pickSong}
                album={data.album}
                type="album"
                key={idx}
              />
            );
          });
          if (songsArr.length > 0 && this.song === null) {
            this.song = songsArr[Math.floor(Math.random() * songsArr.length)];
          }
          return (
            <div className="artist-show-background">
              <div className="artist-show-page-container">
                <BannerPhoto
                  bannerPhoto={data.album.artist.bannerPhoto}
                  imageDrop={this.imageDrop}
                  submitBannerPhoto={this.submitBannerPhoto}
                />
                {this.deleteModal(data.album)}
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
                          alt="cover photo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="artist-info-column">
                    <p>{data.album.artist.username}</p>
                    <div className="artist-info-sub">Artist bio</div>
                    <div className="artist-info-sub">{`Contact ${
                      data.user
                        ? data.user.username
                        : data.album.artist.username
                    }`}</div>
                    <button id="dmodal" onClick={this.toggleDeleteModal}>
                      Delete this album
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default compose(graphql(DELETE_ALBUM, { name: "deleteAlbum" }))(
  AlbumShow
);
