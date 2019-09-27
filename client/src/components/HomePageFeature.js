import React from "react";
import "./HomePageFeature.css";
import FeaturedArtists from "./FeaturedArtists";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import "./FeaturedArtists.css";
import { Link } from "react-router-dom";
const { FETCH_ALBUMS_AND_ARTISTS } = Queries;

class HomePageFeature extends React.Component {
  constructor(props) {
    super(props);
    this.photo = null;
    this.album = null;
  }
  featuredPhoto(data) {
    let shuffledAlbums = data.albums.sort(() => Math.random() - 0.5);
    return (this.featuredAlbums = shuffledAlbums.slice(0, 6));
  }

  componentDidMount() {
    let photoReel = document.addEventListener("DOMContentLoaded", function () {
    });
    if (photoReel)
      photoReel.addEventListener("mouseover", function () {
        console.log("hovered over photo!");
      });
  }

  render() {
    return (
      <Query query={FETCH_ALBUMS_AND_ARTISTS}>
        {({ loading, errors, data }) => {
          if (loading)
            return (
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

          if (data.albums.length > 0) {
            this.featuredPhoto(data);
            return (
              <div>
                <h1 id="daily-picks-heading">Amp Camp Daily Picks</h1>
                <div id="daily-picks-container">
                  <div className="photobanner">
                    <Link to={`/album/${this.featuredAlbums[0]._id}`}>
                      <img alt="wutang"
                        className="photo-reel-image first"
                        src={this.featuredAlbums[0].coverPhotoUrl}
                      ></img>
                    </Link>
                    <Link to={`/album/${this.featuredAlbums[1]._id}`}>
                      <img alt="wutang"
                        className="photo-reel-image"
                        src={this.featuredAlbums[1].coverPhotoUrl}
                      />
                    </Link>
                    <Link to={`/album/${this.featuredAlbums[2]._id}`}>
                      <img alt="wutang"
                        className="photo-reel-image"
                        src={this.featuredAlbums[2].coverPhotoUrl}
                      />
                    </Link>
                    <Link to={`/album/${this.featuredAlbums[3]._id}`}>
                      <img alt="wutang"
                        className="photo-reel-image"
                        src={this.featuredAlbums[3].coverPhotoUrl}
                      />
                    </Link>
                    <Link to={`/album/${this.featuredAlbums[4]._id}`}>
                      <img alt="wutang"
                        className="photo-reel-image"
                        src={this.featuredAlbums[0].coverPhotoUrl}
                      />
                    </Link>
                    <Link to={`/album/${this.featuredAlbums[0]._id}`}>
                      <img alt="wutang"
                        className="photo-reel-image"
                        src={this.featuredAlbums[1].coverPhotoUrl}
                      />
                    </Link>
                    <Link to={`/album/${this.featuredAlbums[1]._id}`}>
                      <img alt="wutang"
                        className="photo-reel-image"
                        src={this.featuredAlbums[2].coverPhotoUrl}
                      />
                    </Link>
                    <Link to={`/album/${this.featuredAlbums[2]._id}`}>
                      <img alt="wutang"
                        className="photo-reel-image"
                        src={this.featuredAlbums[3].coverPhotoUrl}
                      />
                    </Link>
                    <Link to={`/album/${this.featuredAlbums[3]._id}`}>
                      <img alt="wutang"
                        className="photo-reel-image"
                        src={this.featuredAlbums[3].coverPhotoUrl}
                      />
                    </Link>
                  </div>
                </div>
                {/* <h1>Featured Artists</h1> */}
                <FeaturedArtists data={data} />
              </div>
            );
          } else {
            return null;
          }
        }}
      </Query>
    );
  }
}

export default HomePageFeature;
