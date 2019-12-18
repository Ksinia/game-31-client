import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import LoginContainer from "./components/LoginContainer";
import SignupContainer from "./components/SignupContainer";
import { connect } from "react-redux";
import LobbyContainer from "./components/LobbyContainer";
import Footer from "./components/Footer";
import { url } from "./url";
import RoomDetailsPage from "./components/RoomDetailsPage";

class App extends Component {
  stream = new EventSource(`${url}/stream`);

  componentDidMount() {
    this.stream.onmessage = event => {
      const { data } = event;
      const action = JSON.parse(data);
      this.props.dispatch(action);
      console.log(action);
    };
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/signup" component={SignupContainer} />
          <Route path="/room/:room" component={RoomDetailsPage} />
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
