import React from "react";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import "./Nav.css";
import './RegisterPopup.css'
import SearchBar from "./SearchBar";

const { IS_LOGGED_IN } = Queries;
const Nav = props => {
  const showRegister = () => {
    let regform = document.getElementById("reg-form");
    regform.classList = "showRegister";
    let fade = (document.getElementById("form-fader").classList = "form-fader");
  };

  document.addEventListener('DOMContentLoaded' , ()=> {
hideUserTabsOnLoad()
  })

  const hideUserTabsOnLoad = () =>{
    let logout = document.getElementById('logout-tab')
    let profile = document.getElementById('profile-tab')
    let upload = document.getElementById('upload-tab')
    logout.classList.toggle('hide')
    profile.classList.toggle('hide')
    upload.classList.toggle('hide')
    console.log('loaded')
  }

  const hideRegister = () => {
    let regform = document.getElementById("reg-form");
    regform.classList = "hideRegister";
  };

  const closeForm = () => {
    let regform = (document.getElementById("reg-form").classList = "close");
    let realform = document.getElementById("register-form");
    if (realform) realform.classList = "close";
    let fade = (document.getElementById("form-fader").classList = "close");
    let logform = document.getElementById("login-form");
    if (logform) logform.classList = "close";
  };


  const closeUserTab = () => {
    let el = document.getElementById('user-dropdown')
    let dropButton = document.getElementById('user-dropdown')
    console.log(dropButton)
    
    let logout = document.getElementById('logout-tab')
    let profile = document.getElementById('profile-tab')
    let upload = document.getElementById('upload-tab')
      logout.classList.toggle('hide')
    profile.classList.toggle('hide')
    upload.classList.toggle('hide')
  
  }


  return (
    <div>
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              
              if (data.isLoggedIn) {
                return (
                  <div className="outer-nav-container">
                    <div className="nav">
                      <img id="search-icon" src="./search.svg" />
                      <Link to="/"><h1 id="logo" className="logo">AmpCamp</h1></Link>
                      <SearchBar />
                      <ul id="user-dropdown">
                        <li><a onClick={e => closeUserTab(e)}>{localStorage.getItem('username')}</a>
                          <ul>
                            <div>
                              <li>
                                <a onClick={e=> closeUserTab(e)}></a><a className="drop-down-tabs" id="logout-tab"
                                  onClick={e => {
                                    e.preventDefault();
                                    localStorage.removeItem("auth-token");
                                    client.writeData({
                                      data: { isLoggedIn: false }
                                    });
                                    props.history.push("/");
                                  }}
                                >
                                  Logout
                              </a>
                              </li>


                              <li>
                                <Link onClick={(e) => closeUserTab(e)} to={`/upload`}><a id="upload-tab">Upload Album</a></Link>
                              </li>

                              <li>
                                <Link onClick={(e) => closeUserTab(e)} to={`/artist/${localStorage.currentUserId}`}><a id="profile-tab">View Profile</a></Link>
                              </li>


                            </div>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="outer-nav-container">
                    <div className="nav">
                      <Link to="/"><h1 id="logo" className="logo">AmpCamp</h1></Link>
                      <SearchBar />
                      <div className="login-or-signup">
                        <a><Link id="nav-signup" onClick={showRegister}>&nbsp;Sign Up</Link></a>

                        <a><Link onClick={hideRegister} id="nav-login" to="/login"> Login &nbsp;&nbsp;|</Link></a>

                        <form id="reg-form" className="hideRegister">
                          <div
                            onClick={closeForm}
                            className="close-register-button"
                          >
                            X
                          </div>

                          <h1> Sign up for an Amp Camp account</h1>

                          <div className="register-info-container">
                            <div className="register-info-items">
                              <a>
                                <Link id="register-artist" to="/register">
                                  Sign up as an artist
                                </Link>
                              </a>
                              <img src="guitar.svg" />
                              <li id="artist-description">
                                Sign up as an artist Sell directly to your fans
                                with total control over your music and pricing.
                                Easy access to your customers’ data, real-time
                                stats, music chart reporting, and more.
                              </li>
                            </div>
                            <div className="register-info-items">
                              <img src="fan.svg" />
                              <a>
                                <Link
                                  onClick={hideRegister}
                                  id="register-fan"
                                  to="/register"
                                >
                                  Sign up as a fan
                                </Link>
                              </a>

                              <li id="fan-description">
                                Sign up as a fan Follow your favorite artists,
                                keep a wishlist, get instant streaming of your
                                purchases, showcase your collection, and explore
                                the music of like-minded fans
                              </li>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                );
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    </div>
  );
};

// export default Nav;
export default Nav;

{
  /* <button
  onClick={e => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    client.writeData({ data: { isLoggedIn: false } });
    props.history.push("/");
  }}
>Logout</button> */
}
