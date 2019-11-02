import React from 'react';
import './HomePageFeature.css';
import FeaturedArtists from './FeaturedArtists';
import {Query} from 'react-apollo';
import Queries from '../graphql/queries';
import './FeaturedArtists.css';
import {Link} from 'react-router-dom';
const {FETCH_ALBUMS_AND_ARTISTS} = Queries;

class HomePageFeature extends React.Component {
  constructor (props) {
    super (props);
    this.photo = null;
    this.album = null;
  }
  featuredPhoto (data) {
    let shuffledAlbums = data.albums.sort (() => Math.random () - 0.5);
    return (this.featuredAlbums = shuffledAlbums.slice (0, 6));
  }

  componentDidMount () {
    let photoReel = document.addEventListener (
      'DOMContentLoaded',
      function () {}
    );
    if (photoReel)
      photoReel.addEventListener ('mouseover', function () {
        console.log ('hovered over photo!');
      });
  }

  render () {
    return (
      <Query query={FETCH_ALBUMS_AND_ARTISTS}>
        {({loading, errors, data}) => {
          if (loading)
            return (
              <div className="lds-roller">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            );

          if (data.albums.length > 0) {
            this.featuredPhoto (data);
            return (
              <div>
                <h1 id="daily-picks-heading">Amp Camp Daily Picks</h1>
                <div className="w3-content w3-display-container">

                  <Link to={`/album/${this.featuredAlbums[0]._id}`}>
                    <img
                      alt="wutang"
                      className="mySlides"
                      src={this.featuredAlbums[0].coverPhotoUrl}
                    />
                  </Link>
                  <Link to={`/album/${this.featuredAlbums[1]._id}`}>
                    <img
                      alt="wutang"
                      className="mySlides"
                      src={this.featuredAlbums[1].coverPhotoUrl}
                    />
                  </Link>
                  <Link to={`/album/${this.featuredAlbums[2]._id}`}>
                    <img
                      alt="wutang"
                      className="mySlides"
                      src={this.featuredAlbums[2].coverPhotoUrl}
                    />
                  </Link>
                  <Link to={`/album/${this.featuredAlbums[3]._id}`}>
                    <img
                      alt="wutang"
                      className="mySlides"
                      src={this.featuredAlbums[3].coverPhotoUrl}
                    />
                  </Link>

                  <div className="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle">

                    <div
                      class="w3-left w3-hover-text-khaki"
                      onclick="plusDivs(-1)"
                    >
                      &#10094;
                    </div>
                    <div
                      class="w3-right w3-hover-text-khaki"
                      onclick="plusDivs(1)"
                    >
                      &#10095;
                    </div>
                    <span
                      class="w3-badge demo w3-border w3-transparent w3-hover-white"
                      onclick="currentDiv(1)"
                    />
                    <span
                      class="w3-badge demo w3-border w3-transparent w3-hover-white"
                      onclick="currentDiv(2)"
                    />
                    <span
                      class="w3-badge demo w3-border w3-transparent w3-hover-white"
                      onclick="currentDiv(3)"
                    />
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
