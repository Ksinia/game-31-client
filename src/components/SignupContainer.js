import React, { Component } from "react";
import Signup from "./Signup";
import FormContainer from "./FormContainer";
import { connect } from "react-redux";

class SignupContainer extends Component {
  render() {
    return (
      <FormContainer
        type="signup"
        Display={Signup}
        history={this.props.history}
      />
    );
  }
}

export default connect()(SignupContainer);
