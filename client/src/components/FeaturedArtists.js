
import React from 'react'
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import './FeaturedArtists.css'
import { Link } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'
const { FETCH_ALBUMS_AND_ARTISTS } = Queries;

class FeaturedArtists extends React.Component {
    constructor(props) {
        super(props)
        this.renderFeaturedArtists = this.renderFeaturedArtists.bind(this)
        this.playSong = this.playSong.bind(this)
        this.song = null
        this.state = {
            update: null
        }
    }

    renderFeaturedArtists() {
        const { albums } = this.props.data
        if (albums) {
            return (
                <div className="featured-artists-container">
                    {albums.map(album => {
                        return (
                            <div className="featured-artists--item">
                                <Link onClick={(event) => this.playSong(event, album.songs[Math.floor(Math.random() * album.songs.length)])}><img src={album.coverPhotoUrl} /></Link>
                                <Link to={`/artist/${album.artist._id}`}><h4>{album.title}</h4></Link>
                                <Link to={`/artist/${album.artist._id}`}><h4>by {album.by}</h4></Link>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    playSong(event, song) {
        event.preventDefault()
        this.song = song.audioUrl
        this.setState({ update: !this.state.update })
    }

    render() {
        if (this.props.data) {
            return (
                <div>
                    <div>
                        {this.renderFeaturedArtists(this.props.data)}
                        <ReactAudioPlayer
                            src={this.song}
                            autoPlay
                            controls
                        />
                    </div>
                </div>
            )
        }
    }
}

export default FeaturedArtists