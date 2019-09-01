import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { compose, gql, graphql } from 'react-apollo';
import mutations from '../graphql/mutations';
import { toPromise } from 'apollo-link';

class AlbumUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            by: '',
            coverPhotoUrl: '',
            artist: '',
            file: null
            // is this going to have to be files
            // and be an array?
            // we can import the song component and when we
            // iterate over the songs array we can create a new song
            // with each song component
        }
    }

    fileDrop = async files => {
        this.setState({ file: files[0] });
        // are we going to have to iterate over files and then one
        // by one enter them into this files array? 
        // or just use map?
    }

    update (field) {
        return e => {
            this.setState({ [field]: e.target.value} )
        }
    }

    uploadToS3 = async (file, signedRequest) => {
        const options = { headers: { 'Content-Type': file.type} };
        await axios.put(signedRequest, file, options)
    }

    formatFileName = filename => {
        const date = new Date();
        const albumTitle = this.state.title;
        const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const newFileName = `albums/${date}/-${albumTitle}-${cleanFileName}`;
        return newFileName.substring(0, 60);
    }

    handleSubmit = async () => {
        const { title, description, by, coverPhotoUrl, artist, file } = this.state;
        // use other variables(not being used) to create an album somehow?
        // make make the file uploads into an array so that we can iterate over them
        // to create the s3 links and save those in the url
        const res = await this.props.s3Sign({
            variables: {
                filename: this.formatFileName(file.name),
                fileType: file.type
            }
        });

        const { signedRequest, url } = res.data.signS3;
        await this.uploadToS3(file, signedRequest);
        
        // we'll use the information return from the url response creating
        // a song url from S3
        // we need to import query component so that we can
        // use it in the form and be able to use queries as the props
        // in those components

        const newSong = await this.props.createSong({
            variables: {
                title,
                audioUrl: url,
                album: 'how are we going to fill this out',
                artist: 'artist id?'
            }
        });

        this.props.history.push(
            // `/albums/${newSong.data.._id}`??
        );
            
    }

    render () {
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
                <input
                value={this.state.artist}
                onChange={this.update("artist")}
                placeholder="Artist"
                />
                <Dropzone onDrop={this.fileDrop}>
                    <p>
                        Try Dropping some files in here!
                    </p>
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
    graphql(CreateAlbumMutation, { name: 'createAlbum'}),
    graphql(s3SignMutation, { name: 's3Sign'})
)(AlbumUpload);