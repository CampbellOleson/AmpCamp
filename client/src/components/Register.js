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
    document.getElementById('register-form').classList = 'close'
  }


  componentDidMount() {
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
    regform.classList = 'registerForm'

    let registerFan = document.getElementById('register-fan')

    let that = this;
    registerFan.addEventListener('click', function () {
      that.setState({ errors: [] })
    })


  }


  determineAccount() {

    let account = document.getElementById('account-selector')
    let photo = document.getElementById('account-type-photo')

    if (account.selectedIndex === 0) {
      photo.src = './rockstaraccount.svg'
    } else {
      photo.src = './fanaccount.svg'
    }
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
            const { token, username, _id, artist } = data.register;
            localStorage.setItem("auth-token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("currentUserId", _id);
            localStorage.setItem("artist", artist);
            this.props.history.push("/");
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {registerUser => (
            <div>
              <div className="register-photo"></div>
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
                  <h1> Sign up for an account</h1>
                  <div onClick={this.closeFormX} className="close-button">✕</div>

                  <div className="reg-item">
                    <img alt="wutang" className='register-icon' src="./email.svg"></img>

                    <input
                      className='register-input-field'
                      type="email"
                      value={this.state.email}
                      placeholder="enter email"
                      autoComplete="off"
                      onChange={this.update("email")}
                    />
                  </div>
                  <div className="reg-item">
                    <img alt="wutang" className='register-icon' src="./usericon.svg"></img>
                    <input
                      className='register-input-field'
                      type="text"
                      value={this.state.username}
                      placeholder="enter username"
                      autoComplete="off"
                      onChange={this.update("username")}
                    />
                  </div>



                  <div className="reg-item">
                    <img alt="wutang" className='register-icon' src="./lock.svg"></img>
                    <input
                      className='register-input-field'

                      type="password"
                      value={this.state.password}
                      placeholder="enter password"
                      autoComplete="off"
                      onChange={this.update("password")}
                    />
                  </div>

                  <div className='reg-item'>
                    <img alt="wutang" id='account-type-photo' className='register-icon'></img>
                    <select id='account-selector' className='account-type' onChange={this.updateSelect("artist")}>
                      <option
                        defaultValue={Boolean(false)}

                      >
                        Listener
              </option>
                      <option value={Boolean(true)}>
                        Artist
              </option>
                    </select>
                  </div>
                  <button id="register" type="submit">Register</button>
                  <div className="register-errors">{this.state.errors}</div>

                </div>
              </form>
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}

export default Register;
