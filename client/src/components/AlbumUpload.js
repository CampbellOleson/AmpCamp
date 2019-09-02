import React from "react";
import Dropzone from "react-dropzone";
import { compose, gql, graphql } from "react-apollo";
import Mutations from "../graphql/mutations";
const { NEW_ALBUM, NEW_SONG, S3_SIGN } = Mutations;
const FAPI = require("../util/fapi");

class AlbumUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      by: "",
      coverPhotoUrl: "",
      files: []
      // is this going to have to be files
      // and be an array?
      // we can import the song component and when we
      // iterate over the songs array we can create a new song
      // with each song component
    };
  }

  fileDrop = async files => {
    this.setState({ files: files });
    // are we going to have to iterate over files and then one
    // by one enter them into this files array?
    // or just use map?
  };

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  // uploadToS3 = async (file, signedRequest) => {
  //   // console.log(file.type)
  //   const options = {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Access-Control-Allow-Origin": "*"
  //     }
  //   };
  // let http_request = new XMLHttpRequest();
  // http_request.onreadystatechange = function () { /* .. */};
  // http_request.open('PUT', signedRequest)
  // http_request.withCredentials = true;
  // http_request.setHeader('Content-Type', file.type)
  // http_request.setHeader("Access-Control-Allow-Origin", '*');
  // http_request.setRequestHeader("Access-Control-Allow-Origin", true);
  // await http_request.send(file);
  //   await axios.post(signedRequest, file, options);
  // };

  // formatFileName = filename => {
  //   const date = new Date();
  //   const albumTitle = this.state.title;
  //   const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
  //   const newFileName = `albums/${date}/-${albumTitle}-${cleanFileName}`;
  //   return newFileName.substring(0, 60);
  // };

  handleSubmit = async e => {
    e.preventDefault();
    const { title, description, by, coverPhotoUrl, files } = this.state; // file is going to be files and it'll be an array
    // use other variables(not being used) to create an album somehow?
    // make make the file uploads into an array so that we can iterate over them
    // to create the s3 links and save those in the url
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
    // THIS WILL ALL BE INSIDE A FOR LOOP THAT ITERATES OVER
    // THE FILES ARRAY
    // or maybe for each?

    files.forEach(async file => {
      //   const res = await this.props.s3Sign({
      //     variables: {
      //       filename: this.formatFileName(file.name),
      //       filetype: file.type
      //     }
      //   });
      //   console.log(res)
      //   const { signedRequest, url } = res.data.signS3;
      //   await this.uploadToS3(file, signedRequest);

      // we'll use the information return from the url response creating
      // a song url from S3
      // we need to import query component so that we can
      // use it in the form and be able to use queries as the props
      // in those components
      // console.log(newAlbum.data)
      // console.log(newAlbum.data.newAlbum._id)
      // use form data to append to file upload
      // append audio file to append

      const formData = new FormData();
      formData.set("audio", file);
      const res = await FAPI.uploadAudio(formData);
      const newSong = await this.props.newSong({
        variables: {
          title,
          audioUrl: res.data.audioUrl,
          album: newAlbum.data.newAlbum._id,
          artist: cUserId
        }
      });

      console.log(newSong);
    });

    // might not need to make this a constant? maybe we could get
    // away with just making this createSong for every song in the
    // files array

    // not sure where this bad boy is going to go
    // probably right after the forEach loops of the files is done?
    // this.props.history.push(
    // `/albums/${newSong.data.._id}`??
    // );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.title}
            onChange={this.update("title")}
            placeholder="Album Title"
          />
          <input
            value={this.state.description}
            onChange={this.update("description")}
            placeholder="description"
          />
          <input
            value={this.state.by}
            onChange={this.update("by")}
            placeholder="by"
          />
          <input
            value={this.state.coverPhotoUrl}
            onChange={this.update("coverPhotoUrl")}
            placeholder="Image Link"
          />
          <Dropzone onDrop={acceptedFiles => this.fileDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => {
              return (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Upload a track</p>
                  </div>
                </section>
              );
            }}
          </Dropzone>
          <button>Upload Album!</button>
        </form>
      </div>
    );
  }
}

// write the mutation down here and have it be part of the components
// compose method alows you tou use the mutations from the props
// is there another way to use multiple mutations through props
// component?

// const CreateAlbumMuation = gql`mutation blah blah blah`;

// const s3SignMutation = gql`
//     mutations($filename: String!, $filetype: String!) {
//         signS3(filename: $filename, filetype: $filetype) {
//             url
//             signedRequest
//         }
//     }
//     `;

export default compose(
  graphql(NEW_ALBUM, { name: "newAlbum" }),
  graphql(NEW_SONG, { name: "newSong" }),
  graphql(S3_SIGN, { name: "s3Sign" })
)(AlbumUpload);
