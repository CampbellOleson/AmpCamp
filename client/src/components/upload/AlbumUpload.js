import "../../stylesheets/upload_page.css";
import "../../stylesheets/tracks_list.css";
import StyledDropzone from "../generalshow/StyledDropzone";
import React from "react";
import { compose, graphql } from "react-apollo";
import Mutations from "../../graphql/mutations";
import NewTrack from "./TrackForm";
import TracksList from "./TracksList";
import ReactLoading from "react-loading";
const FAPI = require("../../util/fapi");
const { NEW_ALBUM, NEW_SONG, DELETE_ALBUM } = Mutations;

class AlbumUpload extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.submitPhoto = this.submitPhoto.bind(this);
    this.imageDrop = this.imageDrop.bind(this);
    this.uploadTrack = this.uploadTrack.bind(this);
    this.errorComponent = this.errorComponent.bind(this);
    this.state = {
      title: "Untitled Album",
      description: "",
      by: localStorage.getItem("username"),
      coverPhotoUrl: "",
      tracks: {},
      image: null,
      imagePreview: null,
      loading: false,
      error: false
    };
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  validUpload() {
    const { image, title, tracks } = this.state;
    if (image && title && Object.keys(tracks).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  updateTitle() {
    return e => {
      if (e.target.value.length > 0) {
        this.setState({ title: e.target.value });
        this.validUpload();
      } else {
        this.setState({ title: "Untitled Album" });
        this.validUpload();
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

  errorComponent() {
    return this.state.error ? (
      <div className="upload-error">
        Something went wrong with your upload. Try again in a moment.
      </div>
    ) : null;
  }

  async submitTracks(newAlbum, cUserId) {
    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    const uploadLoop = async () => {
      await asyncForEach(Object.values(this.state.tracks), async track => {
        const res = await this.uploadTrack(track);
        await this.props.newSong({
          variables: {
            title: track.title,
            audioUrl: res.data.audioUrl,
            album: newAlbum.data.newAlbum._id,
            artist: cUserId
          }
        });
      });
    };
    await uploadLoop();
  }

  async uploadTrack(track) {
    const formData = new FormData();
    formData.set("audio", track.file);
    const res = await FAPI.uploadAudio(formData);
    return res;
  }

  async submitPhoto() {
    const image = this.state.image;
    const formData = new FormData();
    formData.set("image", image);
    const res = await FAPI.uploadImage(formData);
    // console.log("imageUrl:");
    // console.log(res.data.imageUrl);
    this.setState({ coverPhotoUrl: res.data.imageUrl });
  }

  handleSubmit = async e => {
    e.preventDefault();
    let catchAlbum;
    try {
      if (!this.validUpload()) return;
      this.setState({ loading: true, error: false });

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

      catchAlbum = newAlbum;
      await this.submitTracks(newAlbum, cUserId);

      // throw "oh shit!";

      this.setState({
        title: "",
        description: "",
        by: "",
        coverPhotoUrl: "",
        tracks: {},
        loading: false
      });

      this.props.history.push(`/artist/${cUserId}`);
    } catch (err) {
      await this.setState({ error: true, loading: false });
      this.props.deleteAlbum({
        variables: { id: catchAlbum.data.newAlbum._id }
      });
    }
  };

  imageDrop(image) {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ image: image, imagePreview: fileReader.result });
    };
    if (image) {
      fileReader.readAsDataURL(image);
    }
    this.validUpload();
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

  publishButtonId() {
    return this.validUpload() ? "submit-album-button" : "unclickable-publish";
  }

  publishButton() {
    return !this.state.loading ? (
      <button id={this.publishButtonId()}>Publish ✓</button>
    ) : (
      <div className="loading-balls">
        <ReactLoading color={"#bfff00"} type={"cylon"} />
      </div>
    );
  }

  render() {
    const preview = this.state.imagePreview ? (
      <img alt='wutang' className="image-preview" src={this.state.imagePreview} />
    ) : (
      <img alt='' className="image-preview" />
    );
    return (
      <div className="background">
        {this.errorComponent()}
        <div className="main-content-container">
          <div className="tracks-list-container">
            <div className="album-infobar">
              <div className="album-display-photo">{preview}</div>
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
            <p className="track-header track-sub-header">
              Make sure your file is compatable
            </p>
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
                onChange={this.updateArtist()}
                placeholder="this will default to your username"
              />
              <div className="tags-component">
                tags component (format to be determined)
              </div>
              {this.publishButton()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(NEW_ALBUM, { name: "newAlbum" }),
  graphql(NEW_SONG, { name: "newSong" }),
  graphql(DELETE_ALBUM, { name: "deleteAlbum" })
)(AlbumUpload);
