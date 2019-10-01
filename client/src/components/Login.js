import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations.js";
import "./LoginForm.css";

const { LOGIN_USER } = Mutations;
// loginUser may be login from auth.js

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: []
    };

    this.submitForm = this.submitForm.bind(this);
    this.closeFormX = this.closeFormX.bind(this);
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  closeFormX() {
    document.getElementById("login-form").classList = "close";
  }

  submitForm() {
    document.getElementById("login-form").classList = "log-form";
  }

  componentDidUpdate() {
    let that = this;
    document.getElementById("login-form").classList = "log-form";
    let dropButton = document.getElementById("nav-login");
    dropButton.addEventListener("click", function() {
      that.setState({ errors: [] });
    });
  }

  componentDidMount() {
    document.getElementById("login-form").classList = "log-form";
    this.setState({ errors: [] });
  }

  componentWillUnmount() {
    let logout = document.getElementById("logout-tab");
    let profile = document.getElementById("profile-tab");
    let upload = document.getElementById("upload-tab");

    if (logout && profile && upload) {
      logout.classList = "hide";
      profile.classList = "hide";
      upload.classList = "hide";
    }
  }

  render() {
    return (
      <div>
        <div className="login-photo"></div>
        <Mutation
          mutation={LOGIN_USER}
          onError={err => {
            this.setState({
              errors: err.graphQLErrors[0].message
            });
          }}
          onCompleted={data => {
            const { token, username, _id, artist } = data.login;
            localStorage.setItem("auth-token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("currentUserId", _id);
            localStorage.setItem("artist", artist);
            this.props.history.push("/");
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {login => (
            <div>
              <form
                id="login-form"
                className="log-form"
                onSubmit={e => {
                  e.preventDefault();
                  login({
                    variables: {
                      username: this.state.username,
                      password: this.state.password
                    }
                  });
                }}
              >
                <h1>Log in to your account</h1>
                <div onClick={this.closeFormX} className="close-button-login">
                  ✕
                </div>

                <div className="input-container">
                  <img
                    alt="wutangelo"
                    src="./usericon.svg"
                    className="fa fa-user icon"
                  ></img>

                  <input
                    value={this.state.username}
                    name="username"
                    onChange={this.update("username")}
                    placeholder="Username"
                  />
                </div>

                <div className="input-container">
                  <img
                    alt="wutangelo"
                    src="./lock.svg"
                    className="fa fa-user icon"
                  ></img>

                  <input
                    name="passWord"
                    value={this.state.password}
                    onChange={this.update("password")}
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <button
                  id="log-in-button"
                  onClick={this.submitForm}
                  type="submit"
                >
                  Log In
                </button>
                <a
                  onClick={e => {
                    e.preventDefault();
                    login({
                      variables: {
                        username: "guest",
                        password: "guestuser"
                      }
                    });
                  }}
                  className="guest-login"
                >
                  Continue as guest
                </a>
                <div id="login-errors" className="login-errors">
                  {this.state.errors ? this.state.errors : ""}
                </div>
              </form>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}
export default Login;
