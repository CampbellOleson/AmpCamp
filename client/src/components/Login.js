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
    this.closeForm = this.closeForm.bind(this)

  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  closeForm() {
    let logform = document.getElementById('login-form')
    logform.classList = 'close'
    document.getElementById('form-fader').classList = 'close'
  }

  componentDidMount() {
    document.getElementById('form-fader').classList = 'form-fader'
    let fade = document.getElementById('form-fader').classList = 'form-fader'

  }


  componentDidUpdate() {
    let logform = document.getElementById('login-form')
    logform.classList = 'log-form'
    document.getElementById('form-fader').classList = 'form-fader'
  }

  render() {

    return (
      <Mutation
        mutation={LOGIN_USER}
        onError={err => {
          this.setState({
            errors: err.graphQLErrors[0].message,
            username: '',
            password: ''
          })
        }}
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
              <h1>Log in to your account</h1>
              <div onClick={this.closeForm} className="close-button-login">X</div>

              <div className="input-container">
                <img src="./user.svg" className="fa fa-user icon"></img>

                <input
                  value={this.state.username}
                  name="username"
                  onChange={this.update("username")}
                  placeholder="Username"

                />
              </div>

              <div className="input-container">
                <img src="./lock.svg" className="fa fa-user icon"></img>

                <input
                  name="passWord"
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button onClick={this.closeForm} type="submit">Log In</button>
              <div className="login-errors">{this.state.errors}</div>

            </form>

          </div>
        )}
      </Mutation>
    );
  }
}
export default Login;



