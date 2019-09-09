import React from "react";
import Queries from "../../graphql/queries";
import PlaybarNav from "../generalshow/PlaybarNav";
import BannerPhoto from "../generalshow/BannerPhoto";
import Mutations from "../../graphql/mutations";
import { SongIndexItem, SongListHeader } from "../generalshow/SongIndexItem";
import AlbumIndexItem from "./AlbumIndexItem";
import "../generalshow/BannerPhoto.css";
import "../generalshow/PlaybarNav.css";
import "../generalshow/SongList.css";
import "./ArtistShow.css";
import Spinner from "../Spinner";
import { Query, compose, graphql } from "react-apollo";
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

  componentDidUpdate(prevProps, nextProps) {
    // debugger;
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.song = null;
    }
  }

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
    await this.props.updateBannerPhoto({
      variables: {
        id: this.props.match.params.id,
        bannerPhoto: res.data.imageUrl
      }
    });
  }

  render() {
    return (
      <Query
        query={FETCH_ARTIST}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, err, data }) => {
          if (loading) return <Spinner />;
          if (err) return `Error! ${err.message}`;
          if (!data) return null;
          let albums;
          let displayedSongs;
          let songsArr = [];
          albums = data.user.albums.map((album, idx) => {
            album.songs.forEach(song => songsArr.push(song));
            return <AlbumIndexItem album={album} key={idx} />;
          });
          displayedSongs = songsArr.map(song => (
            <SongIndexItem song={song} pickSong={this.pickSong} type="artist" />
          ));
          if (songsArr.length > 0 && this.song === null) {
            this.song = songsArr[Math.floor(Math.random() * songsArr.length)];
          }
          return (
            <div className="artist-show-background">
              <div className="artist-show-page-container">
                <BannerPhoto
                  bannerPhoto={data.user.bannerPhoto}
                  imageDrop={this.imageDrop}
                  submitBannerPhoto={this.submitBannerPhoto}
                />
                <div className="main-page-container">
                  <div className="main-page-vertical-container">
                    <div className="artist-show-albums-container">{albums}</div>
                    <SongListHeader />
                    <div className="artist-show-songslist-container">
                      <ul>{displayedSongs}</ul>
                    </div>
                    <PlaybarNav song={this.song} />
                  </div>
                  <div className="artist-info-column">
                    <p>{data.user.username}</p>
                    <div className="artist-profile-photo" />
                    <p>Artist bio</p>
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

export default compose(
  graphql(UPDATE_BANNER_PHOTO, { name: "updateBannerPhoto" })
)(ArtistShow);
