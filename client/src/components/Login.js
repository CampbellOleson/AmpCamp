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
    this.submitForm = this.submitForm.bind(this)
    this.closeFormX = this.closeFormX.bind(this)

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
    let logform = document.getElementById('login-form').classList = 'close'
  }

  submitForm() {
    let logform = document.getElementById('login-form').classList = 'close'
    document.getElementById('login-form').classList = 'log-form'
  
  }

  componentDidMount() {
    document.getElementById('login-form').classList = 'log-form'
  }

  componentWillUnmount() {
    let logout = document.getElementById('logout-tab')
    let profile = document.getElementById('profile-tab')
    let upload = document.getElementById('upload-tab')

    if (logout && profile && upload) {
      logout.classList = ('hide')
      profile.classList = ('hide')
      upload.classList = ('hide')
    }
  }

  componentDidUpdate() {
    document.getElementById('login-form').classList = 'log-form'
  //   let closeButton = document.getElementById('log-in-button')
  //  closeButton.addEventListener('click', ()=>{
  //  })
  }


  render() {

    return (
      <div>
        <div className="login-photo"></div>
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
            const { token, username, _id } = data.login;
            localStorage.setItem("auth-token", token);
            localStorage.setItem('username', username);
            localStorage.setItem('currentUserId', _id);
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
                <div onClick={this.closeFormX} className="close-button-login">✕</div>

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
                <button id="log-in-button" onClick={this.submitForm} type="submit">Log In</button>
                <div className="login-errors">{this.state.errors}</div>

              </form>

            </div>
          )}
        </Mutation>
      </div>
    )
  }
}
export default Login;



