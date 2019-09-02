import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations";
const { REGISTER_USER } = Mutations;
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      artist: false
    };
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  updateSelect(field) {
    return e => this.setState({ [field]: Boolean(e.target.value) });
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token, username, _id } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("currentUserId", _id);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <form
            onSubmit={e => {
              e.preventDefault();
              registerUser({
                variables: {
                  email: this.state.email,
                  username: this.state.username,
                  password: this.state.password,
                  artist: this.state.artist
                }
              });
            }}
          >
            <input
              type="email"
              value={this.state.email}
              placeholder="enter email"
              onChange={this.update("email")}
            />
            <input
              type="text"
              value={this.state.username}
              placeholder="enter username"
              onChange={this.update("username")}
            />
            <input
              type="password"
              value={this.state.password}
              placeholder="enter password"
              onChange={this.update("password")}
            />
            <select onChange={this.updateSelect("artist")}>
              <option
                value={Boolean(false)}
                defaultValue
              >
                Listener
              </option>
              <option value={Boolean(true)}>
                Artist
              </option>
            </select>
            <button type="submit">Register</button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default Register;
