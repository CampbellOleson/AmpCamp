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
    this.submitForm = this.submitForm.bind(this)
    this.closeFormX = this.closeFormX.bind(this)
    this.determineAccount = this.determineAccount.bind(this)

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


  submitForm() {
    let fade = document.getElementById('form-fader').classList = 'close'
  }

  componentDidMount() {
    let fade = document.getElementById('form-fader').classList = 'form-fader'
    let account = document.getElementById('account-selector')
    let photo = document.getElementById('account-type-photo')

    if (account.selectedIndex === 0) {
      photo.src = './rockstaraccount.svg'
    } else {
      photo.src = './fanaccount.svg'
    }

  }

  componentDidUpdate() {
    let regform = document.getElementById('register-form')
    let fade = document.getElementById('form-fader').classList = 'form-fader'
    regform.classList = 'registerForm'

  }

  determineAccount() {

    let fade = document.getElementById('form-fader').classList = 'form-fader'
    let account = document.getElementById('account-selector')
    let photo = document.getElementById('account-type-photo')

    if (account.selectedIndex === 0) {
      photo.src = './rockstaraccount.svg'
    } else {
      photo.src = './fanaccount.svg'
    }

  }


  render() {

    return (
      <div>
        <Mutation
          mutation={REGISTER_USER}
          onError={err => {
            this.setState({
              errors: err.graphQLErrors[0].message,

            })
          }}
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

                <div className="reg-item">
                  <img className='register-icon' src="./email.svg"></img>

                  <input
                    className='register-input-field'
                    type="email"
                    value={this.state.email}
                    placeholder="enter email"
                    autocomplete="off"
                    onChange={this.update("email")}
                  />
                </div>
                <div className="reg-item">
                  <img className='register-icon' src="./user.svg"></img>
                  <input
                    className='register-input-field'
                    type="text"
                    value={this.state.username}
                    placeholder="enter username"
                    autocomplete="off"
                    onChange={this.update("username")}
                  />
                </div>



                <div className="reg-item">
                  <img className='register-icon' src="./lock.svg"></img>
                  <input
                    className='register-input-field'

                    type="password"
                    value={this.state.password}
                    placeholder="enter password"
                    autocomplete="off"
                    onChange={this.update("password")}
                  />
                </div>

                <div className='reg-item'>
                  <img id='account-type-photo' className='register-icon'></img>
                  <select onChange={this.determineAccount} id='account-selector' className='account-type' onChange={this.updateSelect("artist")}>
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
                </div>
                <button onClick={this.submitForm} type="submit">Register</button>
                <div className="register-errors">{this.state.errors}</div>

              </div>
            </form>
          )}
        </Mutation>
      </div>
    )
  }
}

export default Register;
