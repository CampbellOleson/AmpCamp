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
    this.state = {
      currentPhoto: 1,

    }
    this.shuffledPhotos = false;

  }
  featuredPhoto(data) {
    let shuffledAlbums = data.albums.sort((a, b) => a > b);
    // let shuffledAlbums = data.albums.sort(() => Math.random() - 0.5);
    return (this.featuredAlbums = shuffledAlbums.slice(0))
  }
  componentDidMount() {
    // let photoReel = document.addEventListener("DOMContentLoaded", function () {
    // });
    // if (photoReel)
    //   photoReel.addEventListener("mouseover", function () {
    //     console.log("hovered over photo!");
    //   });
  }

  nextPhoto(increment, e) {
    console.log('posOrNeg', increment)
    e.preventDefault()
    let newState = {};

    if (increment === 1 && this.state.currentPhoto < this.featuredAlbums.length) {
      this.state.currentPhoto++;
      console.log('album length', this.featuredAlbums.length)
      increment = 0;
    }
    if (increment === 1 && this.state.currentPhoto === this.featuredAlbums.length) {
      this.state.currentPhoto = 0
      console.log('album length', this.featuredAlbums.length)

      increment = 0;
    }
    if (increment === -1 && this.state.currentPhoto > 0) {
      this.state.currentPhoto--;
      increment = 0;
    }

    if (increment === -1 && this.state.currentPhoto === 0) {
      this.state.currentPhoto = this.featuredAlbums.length
      increment = 0;
    }


    newState.currentPhoto = this.state.currentPhoto

    // console.log(newState)
    this.setState(newState)
    // console.log('state', this.state)

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
            this.shuffledPhotos = !this.shuffledPhotos

            this.featuredPhoto(data);

            this.photosToCycle = this.featuredAlbums.map(album => {
              return <Link to={`/album/${album._id}`}>
                <img alt="wutang"
                  className="photo-reel-image"
                  src={album.coverPhotoUrl}
                ></img>
              </Link>
            })

            return (
              <div>
                <h1 id="daily-picks-heading">Amp Camp Daily Picks</h1>
                <div id="daily-picks-container">
                  <div className="photobanner">
                    <button className="left-photo" onClick={(e) => this.nextPhoto(-1, e)}></button>
                    {this.photosToCycle[this.state.currentPhoto !== 0 ? this.state.currentPhoto - 1 : 1]}
                    <button className="right-photo" onClick={(e) => this.nextPhoto(1, e)}></button>

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