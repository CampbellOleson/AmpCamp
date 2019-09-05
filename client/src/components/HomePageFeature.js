import React from 'react'
import './HomePageFeature.css'
import FeaturedArtists from './FeaturedArtists'
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import './FeaturedArtists.css'
import { Link } from 'react-router-dom'
const { FETCH_ALBUMS_AND_ARTISTS } = Queries;

class HomePageFeature extends React.Component {
    constructor(props) {
        super(props)
        this.photo = null
        this.album = null
    }
    featuredPhoto(data) {

        return (
            this.featuredAlbum = data.albums[Math.floor(Math.random() * data.albums.length)]
        )
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
                        this.featuredPhoto(data)
                        return (
                            <div>
                                <div className="featured-master-container">
                                    <div className="featured-container">
                                        <div className="featured-photo">
                                            <Link to={`/album/${this.featuredAlbum._id}`}><img id="test" src={this.featuredAlbum.coverPhotoUrl} /></Link>
                                        </div>

                                        <div className="featured-info">
                                            <h1>{this.featuredAlbum.title}</h1>
                                            <hr></hr>
                                        </div>


                                    </div>
                                </div>
                                <FeaturedArtists data={data} />
                            </div>
                        )
                    } else {
                        return null;
                    }
                }}
            </Query>
        )
    }

}

export default HomePageFeature
