import React from "react";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import './RegisterPopup.css'
import './Nav.css'
import SearchBar from "./SearchBar";

const { IS_LOGGED_IN } = Queries;
const Nav = props => {


  const showRegister = () => {
    let regform = document.getElementById('reg-form')
    regform.classList = 'showRegister'
    let fade = document.getElementById('form-fader').classList = 'form-fader'
  }

  const hideRegister = () => {
    let regform = document.getElementById('reg-form')
    regform.classList = 'hideRegister'
  }

  const closeForm = () => {
    let regform = document.getElementById('reg-form').classList = 'close'
    let realform = document.getElementById('register-form')
    if (realform) realform.classList = 'close'
    let fade = document.getElementById('form-fader').classList = 'close'
    let logform = document.getElementById('login-form')
    if (logform) logform.classList = 'close'
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
                      <ul className="logo">AmpCamp</ul>
                      <ul>
                        <li><a>{localStorage.getItem('username')}</a>
                          <ul>
                            <li><a onClick={e => {
                              e.preventDefault()
                              localStorage.removeItem("auth-token");
                              client.writeData({ data: { isLoggedIn: false } });
                              props.history.push("/")
                            }}>Logout</a></li>
                            <li><a>Upload Album</a></li>
                          </ul>
                        </li>
                      </ul>
                      <SearchBar />
                    </div>
                  </div>
                )
              } else {
                return (

                  <div className="outer-nav-container">

                    <div className="nav">
                      <SearchBar />
                      <ul className="logo">AmpCamp</ul>
                      <div className="login-or-signup">
                        <a><Link id="nav-signup" onClick={showRegister}>&nbsp;Sign Up</Link></a>

                        <a ><Link onClick={hideRegister} id="nav-login" to="/login"> Login &nbsp;&nbsp;|</Link></a>

                        <form id="reg-form" className="hideRegister">
                          <div onClick={closeForm} className="close-register-button">X</div>

                          <h1> Sign up for an Amp Camp account</h1>

                          <div className="register-info-container">
                            <div className="register-info-items">
                              <a><Link id="register-artist" to="/register">Sign up as an artist</Link></a>
                              <img src="guitar.svg" />
                              <li id="artist-description">Sign up as an artist
                                Sell directly to your fans with total control over your
                                music and pricing. Easy access to your customers’ data,
                                real-time stats, music chart reporting, and more.
                            </li>
                            </div>
                            <div className="register-info-items">
                              <img src="fan.svg" />
                              <a><Link onClick={hideRegister} id="register-fan" to="/register">Sign up as a fan</Link></a>

                              <li id="fan-description">
                                Sign up as a fan Follow your favorite artists,
                                keep a wishlist, get instant streaming of
                                your purchases, showcase your collection,
                            and explore the music of like-minded fans
                            </li>
                            </div>


                          </div>


                        </form>
                      </div>
                    </div>
                  </div>


                )
              }
            }}

          </Query>
        )
        }
      </ApolloConsumer>
    </div>
  );
};

export default Nav;


{/* <button
  onClick={e => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    client.writeData({ data: { isLoggedIn: false } });
    props.history.push("/");
  }}
>Logout</button> */}