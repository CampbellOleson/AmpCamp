import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';

const FETCH_USERS = gql`
{
  users {
    _id 
    username
    email
    date 
  }
}
`;

const App = () => {
  return (
    <Query query={FETCH_USERS}>

    {({loading, error, data}) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return(
        <ul>
          {data.users.map(user =>(
            <li key={user.id}>{user.username}
              {user.email}
              {user.date}
            </li>
          ))}
        </ul>
      )
    }}
    </Query>
  )
}

export default App;
