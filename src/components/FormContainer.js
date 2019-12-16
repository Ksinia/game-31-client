import React, { Component } from "react";
import { connect } from "react-redux";
import { loginSignupFunction } from "../thunks";

class FormContainer extends Component {
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
    this.props.dispatch(
      loginSignupFunction(
        this.props.type,
        this.state.name,
        this.state.password,
        this.props.history.push
      )
    );
  };

  render() {
    const { Display } = this.props;
    return (
      <Display
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        values={this.state}
      />
    );
  }
}

export default connect()(FormContainer);