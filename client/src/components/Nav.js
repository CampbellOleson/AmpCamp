import React from "react";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import "./Nav.css";
import "./RegisterPopup.css";
import SearchBar from "./SearchBar";

const { IS_LOGGED_IN } = Queries;
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: null
    };

    this.closeForm = this.closeForm.bind(this);
    this.closeUserTab = this.closeUserTab.bind(this);
    this.hideRegister = this.hideRegister.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  showRegister() {
    let regform = document.getElementById("reg-form");
    regform.classList = "showRegister";
  }

  componentDidMount() {
    window.onclick = function (event) {
      if (!event.target.matches(".nav-link")) {
        let dropDownCont = document.querySelector(".dropdown-container");
        if (dropDownCont && !dropDownCont.classList.contains("hide")) {
          dropDownCont.classList.toggle("hide");
        }
      }
    };
  }

  hideRegister() {
    let regform = document.getElementById("reg-form");
    regform.classList = "hideRegister";
  }

  closeForm() {
    document.getElementById("reg-form").classList = "close"
    let realform = document.getElementById("register-form");
    if (realform) realform.classList = "close";
    let logform = document.getElementById("login-form");
    if (logform) logform.classList = "close";
  }

  handleLogout = client => e => {
    e.preventDefault();
    this.closeUserTab(e);
    localStorage.removeItem("auth-token");
    client.writeData({
      data: { isLoggedIn: false }
    });
  };

  closeUserTab() {
    if (localStorage.username) {
      let dropDownCont = document.querySelector(".dropdown-container");

      if (dropDownCont) {
        dropDownCont.classList.toggle("hide");
        this.setState({ toggle: "hi" });
      }
    } else {
      return null;
    }
  }

  render() {

    let profileLink;
    let uploadLink;
    return (
      <div>
        <ApolloConsumer>
          {client => (
            <Query query={IS_LOGGED_IN}>
              {({ data, err }) => {
                if (err) return `Error: !${err}`
                if (data.isLoggedIn) {
                  if (localStorage.artist === 'true') {
                    profileLink = <li>
                      <Link
                        onClick={e => this.closeUserTab(e)}
                        to={`/artist/${localStorage.currentUserId}`}
                      >
                        Profile
                         </Link>
                    </li>;
                    uploadLink = <li>
                      <Link
                        onClick={e => this.closeUserTab(e)}
                        to={`/upload`}
                      >
                        Upload Album
                        </Link>
                    </li>
                  } else {
                    profileLink = <div></div>
                    uploadLink = <div></div>
                  }
                  // console.log(data);
                  // console.log(localStorage);
                  return (

                    <div className="outer-nav-container">
                      <div className="nav">
                        <div className="nav-search-container">
                          <div className="heading-and-logo">
                            <Link to="/">
                              <div className="logo">
                                <img alt="wutang"
                                  id="amp-camp-logo"
                                  src={require("../ampcampinverted.png")}
                                />
                              </div>
                              <h1 className="nav-heading">Upload your music and share it with the world.</h1>

                            </Link>
                          </div>

                        </div>

                        {/************************************************************/}
                        <div className="user-profile-container">
                          <SearchBar />
                          <img className="search-icon" src="search-icon.png"></img>
                          <button
                            id="nav-link"
                            className="nav-link"
                            onClick={e => this.closeUserTab(e)}
                          >
                            {localStorage.getItem("username")}
                          </button>
                          <div className="dropdown-container hide">
                            <ul>
                              {/* <li>
                                <Link
                                  onClick={e => this.closeUserTab(e)}
                                  to={`/upload`}
                                >
                                  Upload Album
                                </Link>
                              </li> */}
                              {uploadLink}
                              {profileLink}
                              {/* <li>
                                <Link
                                  onClick={e => this.closeUserTab(e)}
                                  to={`/artist/${localStorage.currentUserId}`}
                                >
                                  Profile
                                </Link>
                              </li> */}
                              <li>
                                <Link to={'/'} onClick={this.handleLogout(client)}>
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/************************************************************/}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="outer-nav-container">
                      <div className="nav">
                        <div className="nav-search-container">
                          <Link to="/">
                            <div className="logo">
                              <img alt="wutang"
                                id="amp-camp-logo"
                                src={require("../ampcampinverted.png")}
                              />
                            </div>
                          </Link>
                          <SearchBar />
                        </div>
                        <div className="login-or-signup">

                          <Link
                            onClick={this.hideRegister}
                            id="nav-login"
                            to="/login"
                          >
                            Login &nbsp;&nbsp;&nbsp;|
                            </Link>


                          <Link to={'/register'} id="nav-signup" onClick={this.showRegister}>
                            Sign Up &nbsp;
                            </Link>


                          <form id="reg-form" className="hideRegister">
                            <div
                              onClick={this.closeForm}
                              className="close-register-button"
                            >
                              ✕
                            </div>

                            <h1> Sign up for an Amp Camp account</h1>

                            <div className="register-info-container">
                              <div className="register-info-items">

                                <Link
                                  onClick={this.hideRegister}
                                  id="register-artist"
                                  to="/info"
                                >
                                  Sign up as an artist
                                  </Link>

                                <img alt="wutang" src="guitar.svg" />
                                <li id="artist-description">
                                  Sell directly to your fans with total control
                                  over your music and pricing. Easy access to
                                  your customers’ data, real-time stats, music
                                  chart reporting, and more.
                                </li>
                              </div>
                              <div className="register-info-items">
                                <img alt="wutang" src="fan.svg" />

                                <Link
                                  onClick={this.hideRegister}
                                  id="register-fan"
                                  to="/register"
                                >
                                  Sign up as a fan
                                  </Link>


                                <li id="fan-description">
                                  Follow your favorite artists, keep a wishlist,
                                  get instant streaming of your purchases,
                                  showcase your collection, and explore the
                                  music of like-minded fans
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
  }
}

export default Nav;
