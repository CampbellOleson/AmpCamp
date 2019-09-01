import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from '../graphql/mutations.js'
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

  //   componentWillReceiveProps(nextProps){
  // console.log('hi!')
  //   }

  updateCache(client, { data }) {
    // console.log(data);
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
        onError={err => { this.setState({errors:err.graphQLErrors[0].message})}}
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
              <div>{this.state.errors}</div>
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

export default Login;
