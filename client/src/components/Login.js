import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";
import Mutations from '../graphql/mutations.js'
const {LOGIN_USER} = Mutations

// loginUser may be login from auth.js

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  updateCache(client, {data}){
    console.log(data);

    client.writeData({
        data: { isLoggedIn: data.login.loggedIn}
    });
  }


  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {login => (
          <div>
            <form
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
              <input
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
              />

              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Log In</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(Login);
