import React, { Component } from "react";
import Login from "./Login";
import { connect } from "react-redux";
import { loginFunction } from "../thunks";

class LoginContainer extends Component {
  initialState = {
    name: "",
    password: ""
  };

  state = this.initialState;

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.dispatch(loginFunction(this.state.name, this.state.password));
  };

  render() {
    return (
      <Login
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        values={this.state}
      />
    );
  }
}

export default connect()(LoginContainer);
