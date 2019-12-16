import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import LoginContainer from "./components/LoginContainer";
import SignupContainer from "./components/SignupContainer";
import { connect } from "react-redux";
import LobbyContainer from "./components/LobbyContainer";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/signup" component={SignupContainer} />
          <Route
            path="/"
            component={this.props.user ? LobbyContainer : LoginContainer}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(App);
