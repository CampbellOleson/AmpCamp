import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from '../graphql/mutations.js'
import './LoginForm.css'
const { LOGIN_USER } = Mutations
// loginUser may be login from auth.js

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: []
    };


  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {

    return (
      <Mutation
        mutation={LOGIN_USER}
        onError={err => { this.setState({ errors: err.graphQLErrors[0].message }) }}
        onCompleted={data => {

          const { token, username } = data.login;
          localStorage.setItem("auth-token", token);
          localStorage.setItem('username', username)
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {login => (
          <div>
            <form id="login-form" className="log-form"
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

              <div className="login-errors">{this.state.errors}</div>
              <label labelfor="username">username</label>
              <input
                value={this.state.username}
                name="username"
                onChange={this.update("username")}

                id="username"
              />
              <label htmlFor="passWord">password</label>

              <input
                name="passWord"
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                id="passWord"
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
export default Login;
