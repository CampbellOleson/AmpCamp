import "../../stylesheets/upload_page.css";
import "../../stylesheets/tracks_list.css";
import StyledDropzone from "./StyledDropzone";
import React from "react";
import { compose, graphql } from "react-apollo";
import Mutations from "../../graphql/mutations";
import NewTrack from "./TrackForm";
import TracksList from "./TracksList";
const FAPI = require("../../util/fapi");
const { NEW_ALBUM, NEW_SONG } = Mutations;

class AlbumUpload extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.submitPhoto = this.submitPhoto.bind(this);
    this.imageDrop = this.imageDrop.bind(this);
    this.state = {
      title: "Untitled Album", // how to make this return?
      description: "",
      by: localStorage.getItem("username"),
      coverPhotoUrl: "",
      tracks: {},
      image: null,
      displayImage: ""
    };
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  updateTitle() {
    return e => {
      if (e.target.value.length > 0) {
        this.setState({ title: e.target.value });
      } else {
        this.setState({ title: "Untitled Album" });
      }
    };
  }

  updateArtist() {
    return e => {
      if (e.target.value.length > 0) {
        this.setState({ by: e.target.value });
      } else {
        const username = localStorage.getItem("username");
        this.setState({ by: username });
      }
    };
  }

  async submitPhoto() {
    const image = this.state.image;
    const formData = new FormData();
    formData.set("image", image);
    const res = await FAPI.uploadImage(formData);
    console.log(res.data.imageUrl);
    this.setState({ coverPhotoUrl: res.data.imageUrl });
  }

  handleSubmit = async e => {
    e.preventDefault();
    await this.submitPhoto();
    const { title, description, by, coverPhotoUrl } = this.state;
    const cUserId = localStorage.getItem("currentUserId");
    const newAlbum = await this.props.newAlbum({
      variables: {
        title,
        description,
        by,
        coverPhotoUrl,
        artist: cUserId
      }
    });

    Object.values(this.state.tracks).forEach(async track => {
      const formData = new FormData();
      formData.set("audio", track.file);
      const res = await FAPI.uploadAudio(formData);
      await this.props.newSong({
        variables: {
          title: track.title,
          audioUrl: res.data.audioUrl,
          album: newAlbum.data.newAlbum._id,
          artist: cUserId
        }
      });
    });

    this.setState({
      title: "",
      description: "",
      by: "",
      coverPhotoUrl: "",
      tracks: {}
    });
  };

  imageDrop(image) {
    this.setState({ image: image });
  }

  addTrack(track) {
    const tracks = this.state.tracks;
    tracks[track.title] = track;
    this.setState({
      tracks: tracks
    });
  }

  deleteTrack(track) {
    const tracks = this.state.tracks;
    const title = track.title;
    delete tracks[title];
    this.setState({
      tracks: tracks
    });
  }

  render() {
    return (
      <div className="background">
      <div className="main-content-container">
        <div className="tracks-list-container">
          <div className="album-infobar">
            <div className="album-display-photo" />
            <div className="album-info">
              <div id="album-display-title" className="album-info-item">
               {this.state.title}
              </div>
              <div id="album-display-description" className="album-info-item">
                {this.state.description}
              </div>
              <div id="album-display-artist" className="album-info-item">
                by: {this.state.by}
              </div>
            </div>
          </div>
          <p className="track-header">Add some tracks:</p>
          <p className="track-header track-sub-header">Make sure you file is compatable</p>
          <NewTrack addTrack={this.addTrack} />
          <TracksList
            tracks={Object.values(this.state.tracks)}
            deleteTrack={this.deleteTrack}
          />
        </div>
        <div className="album-form-wrapper">
          <form onSubmit={this.handleSubmit} className="album-form">
            <div className="photo-drop-container">
              <StyledDropzone fileDrop={this.imageDrop} />
            </div>
        <p id="album-info">Album information</p>
            <input
              // value={this.state.title}
              id="album-title-input"
              onChange={this.updateTitle()}
              placeholder="album title"
            />
            <label className="album-form-label">About this album:</label>
            <textarea
              value={this.state.description}
              id="album-description-input"
              onChange={this.update("description")}
              placeholder="or maybe your music speaks for itself"
            />
            <label className="album-form-label">Artist:</label>
            <input
              // value={this.state.by}
              onChange={this.updateArtist()}
              placeholder="this will default to your username"
            />
            <div className="tags-component">
              tags component (format to be determined)
            </div>
            <button id="submit-album-button">Publish ✓</button>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default compose(
  graphql(NEW_ALBUM, { name: "newAlbum" }),
  graphql(NEW_SONG, { name: "newSong" })
)(AlbumUpload);
