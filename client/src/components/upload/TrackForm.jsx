import React from "react";
import Dropzone from "react-dropzone";

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.audioDrop = this.audioDrop.bind(this);
    this.state = {
      _EDITING: true,
      valid: false,
      title: "",
      file: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.title.length === 0) return;
    this.props.addTrack({ title: this.state.title, file: this.state.file });
    this.setState({
      _EDITING: false,
      title: "",
      file: null
    });
  }

  audioDrop(file) {
    this.setState({ file: file[0] });
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value, valid: true });
    };
  }

  //   updateTitle() {
  //   return e => {
  //   if (e.target.value.length > 0 ){
  //     this.setState({ title: e.target.value });
  //   } else {
  //     this.setState({ title: "Untitled" });
  //   }}
  // }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="new-track-form">
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.update("title")}
          placeholder="track name"
        />
        <Dropzone onDrop={file => this.audioDrop(file)}>
          {({ getRootProps, getInputProps }) => {
            return (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p id="audio-drop">Attach audio</p>
                </div>
              </section>
            );
          }}
        </Dropzone>
        <button type="submit">Add track ✓</button>
      </form>
    );
  }
}

export default TrackForm;
