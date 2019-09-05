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

                                <div className="featured-master-container">
                                    <div className="featured-container">
                                        <div className="featured-photo">
                                            <img id="test" src="./metallica.jpg" />
                                        </div>
                                        <div className="featured-stack">
                                            <div><img id="test" src="./metallica.jpg" /></div>
                                            <div><img id="test" src="./metallica.jpg" /></div>
                                            <div><img id="test" src="./metallica.jpg" /></div>
                                        </div>

                                    </div>
                                </div>
                                <FeaturedArtists data={data} />
                            </div>
                        )
                    }
                }}
            </Query>
        )
    }

}

export default HomePageFeature
