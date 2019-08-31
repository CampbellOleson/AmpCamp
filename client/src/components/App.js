import React, { Component } from "react";
import { Query } from "react-apollo";
import { Switch } from "react-router-dom";
import { Route } from 'react-router'
import Login from "./Login";
const App = () => {
  return (
    <div>
      <h1>AmpCamp</h1>
      
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
