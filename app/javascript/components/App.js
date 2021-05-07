import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Coffees from "./Coffees/Coffees";
import Coffee from "./Coffee/Coffee";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Forgot from "./Auth/Password/Forgot";
import Reset from "./Auth/Password/Reset";
import Navbar from "./Navbar";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import UnprotectedRoute from "./UnprotectedRoute";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Coffees} />
          <Route exact path="/coffees/:slug" component={Coffee} />
          <UnprotectedRoute path="/login" component={Login} />
          <UnprotectedRoute exact path="/register" component={Register} />
          <UnprotectedRoute path="/forgot-password" component={Forgot} />
          <UnprotectedRoute path="/reset-password" component={Reset} />
        </Switch>
      </AuthProvider>
    );
  }
}

export default App;
