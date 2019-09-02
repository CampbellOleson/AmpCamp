import React, { Component } from "react";
import { Query } from "react-apollo";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AuthRoute from '../util/route_util';
import Nav from './Nav';
import Home from './Home';
import AlbumUpload from './AlbumUpload';

const App = () => {
  return (
    <div>
      <h1>AmpCamp</h1>
      <Route path='/' component={Nav}/> 
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} routeType='auth' />
        <AuthRoute exact path="/register" component={Register} routeType='auth' />
        <AuthRoute exact path="/albumupload" component={AlbumUpload} />
      </Switch>
    </div>
  );
};

export default App;
