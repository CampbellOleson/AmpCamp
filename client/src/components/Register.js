import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations";
import './RegisterForm.css'
const { REGISTER_USER } = Mutations;
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      errors: '',
      artist: false
    };
    this.closeForm = this.closeForm.bind(this)
    this.closeFormX = this.closeFormX.bind(this)

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

  closeFormX() {
    let regform = document.getElementById('register-form').classList = 'close'
    let fade = document.getElementById('form-fader').classList = 'close'
  }

  componentWillUnmount() {
    // this.setState({ errors: '', username: '', password: '', email: '' })
  }


  closeForm() {
    let fade = document.getElementById('form-fader').classList = 'close'

  }

  componentDidMount() {
    let fade = document.getElementById('form-fader').classList = 'form-fader'

  }

  componentDidUpdate() {
    let regform = document.getElementById('register-form')
    let fade = document.getElementById('form-fader').classList = 'form-fader'
    regform.classList = 'registerForm'

  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onError={err => {
          this.setState({
            errors: err.graphQLErrors[0].message,

          })
        }}
        onCompleted={data => {
          const { token, username } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("username", username);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <form id="register-form" className="registerForm"
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
            <div className="register-content">
              <h1> Sign up for a fan account</h1>
              <div onClick={this.closeFormX} className="close-button">X</div>

              <input
                type="email"
                value={this.state.email}
                placeholder="enter email"
                autocomplete="off"
                onChange={this.update("email")}
              />
              <input
                type="text"
                value={this.state.username}
                placeholder="enter username"
                autocomplete="off"
                onChange={this.update("username")}
              />
              <input
                type="password"
                value={this.state.password}
                placeholder="enter password"
                autocomplete="off"
                onChange={this.update("password")}
              />
              <select onChange={this.updateSelect("artist")}>
                <option
                  value={Boolean(false)}
                  selected
                >
                  Listener
              </option>
                <option value={Boolean(true)}>
                  Artist
              </option>
              </select>
              <button onClick={this.closeForm} type="submit">Register</button>
              <div className="register-errors">{this.state.errors}</div>

            </div>
          </form>
        )}
      </Mutation>
    );
  }
}

export default Register;
