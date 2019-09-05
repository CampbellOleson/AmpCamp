
import React from 'react'
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import './FeaturedArtists.css'
import { Link } from 'react-router-dom'
const { FETCH_ALBUMS_AND_ARTISTS } = Queries;

class FeaturedArtists extends React.Component {
    constructor(props) {
        super(props)
        this.renderFeaturedArtists = this.renderFeaturedArtists.bind(this)
    }


    renderFeaturedArtists(data) {
        const { albums } = data;
       
        if (albums) {
            return (
                <div className="featured-artists-container">
                    {albums.map(album => {
                        return (
                            <div className="featured-artists--item">
                                <Link to={`/album/${album._id}`}><img src={album.coverPhotoUrl} /></Link>
                                <Link to={`/artist/${album.artist._id}`}><h4>{album.title}</h4></Link>
                                <Link to={`/artist/${album.artist._id}`}><h4>by {album.by}</h4></Link>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    render() {
        return (
            <Query query={FETCH_ALBUMS_AND_ARTISTS}>
                {({ loading, errors, data }) => {
                    if (loading) return (
                        <div className="lds-roller">
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
                    if (data) {
                        return (
                            <div>
                                {this.renderFeaturedArtists(data)}
                            </div>
                        )
                    }
                }}
            </Query>
        )
    }
}

export default FeaturedArtists