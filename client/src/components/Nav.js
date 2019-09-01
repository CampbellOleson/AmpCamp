import React from "react";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import './Nav.css'
const { IS_LOGGED_IN } = Queries;

const Nav = props => {


  return (
    <div>
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                return (
                  <div className="outer-nav-container">
                    
                    <div className="nav">
                      <ul className="logo">AmpCamp</ul>
                      <ul>
                            <input type="text" className="nav-search" placeholder="find some music"></input>
                        <li><a>Profile</a>
                          <ul>
                            <li><a onClick={e => {
                              e.preventDefault()
                              localStorage.removeItem("auth-token");
                              client.writeData({ data: { isLoggedIn: false } });
                              props.history.push("/")
                            }}>Logout</a></li>
                            <li><a>Upload Album</a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>

                )
              } else {
                return (
                  <div className="outer-nav-container">
                    <div className="nav">
                      <ul className="logo">AmpCamp</ul>
                      <div className="login-or-signup">
                        <a><Link to="/register"> Sign Up</Link></a>
                        <a><Link to="/login"> Login &nbsp;&nbsp;|</Link></a>
                      </div>
                    </div>
                  </div>


                )
              }
            }}

          </Query>
        )
        }
      </ApolloConsumer>
    </div>
  );
};

export default Nav;


{/* <button
  onClick={e => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    client.writeData({ data: { isLoggedIn: false } });
    props.history.push("/");
  }}
>Logout</button> */}