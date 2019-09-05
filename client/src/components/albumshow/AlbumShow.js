import React from 'react';
import Queries from '../../graphql/queries';
import { Query, compose, graphql } from 'react-apollo';
import ReactAudioPlayer from 'react-audio-player';
import StyledDropZone from "../artistshow/StyledDropzone";
const { FETCH_ALBUM } =  Queries;

class AlbumShow extends React.Component {
    constructor(props) {
        super(props);
        this.song = null;
        this.state = {
            currentlyPlaying: false
        }
    }

    pickSong(e, song) {
        e.preventDefault();
        this.song = song;
        this.setState({ currentlyPlaying: (!this.state.currentlyPlaying) })
    }

    render() {
        return(
            <Query
                query={FETCH_ALBUM}
                variables={{id: this.props.match.params.id}}
            >
            {({ loading, err, data}) => {
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
                if(!data) return null;
                let bPhoto;
                let songs = [];
                let dispSongs;
                dispSongs = data.album.songs.map(song => {
                    songs.push(song);
                    return <div className='album-show-song-list-container'>
                        <li key={song._id}>
                            Song Title: {song.title}
                            Artist: {song.artist.username}
                        </li>
                        <button className='song-play-button'onClick={e => this.pickSong(e, song)}></button>
                    </div>
                })
                bPhoto =
                data.album.artist.bannerPhoto === null ? (
              <div>
                <StyledDropZone fileDrop={this.imageDrop} />
                <button onClick={this.submitBannerPhoto}>
                  Upload your banner photo!!
                </button>
              </div>
                ) : (
              <img
                className="artist-show-banner-image"
                src={data.album.artist.bannerPhoto}
              />
            );
            // debugger;
            // let song = 
            // console.log(song)
            if (songs.length > 0 && this.song === null) {
                // debugger;
                this.song = songs[Math.floor(Math.random() * songs.length)];
            }
            return (
            <div className="album-show-page-container">
              <div className="banner-photo-container">{bPhoto}</div>
              <div className='main-page-container'>
              <h2 className="album-show-page-title">{data.album.title}</h2>
              <div className="audio-player-element">
                <span className='currently-playing'>Currently Playing: {this.song.title}</span>
                <ReactAudioPlayer className='audio-player' src={this.song.audioUrl} autoPlay controls />
              </div>
              <div className="album-show-songslist-container">
                <ul>{dispSongs}</ul>
              </div>
              </div>
            </div>
          );
            }}    
            </Query>
        )
    }
}

export default AlbumShow;