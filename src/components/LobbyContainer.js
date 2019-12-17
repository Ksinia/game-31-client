import React, { Component } from "react";
import superagent from "superagent";
import { url } from "../url";

class LobbyContainer extends Component {
  state = {
    text: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    try {
      const response = await superagent.post(`${url}/room`).send({
        name: this.state.text
      });
      console.log("response test: ", response);
    } catch (error) {
      console.warn("error test:", error);
    } //just yellow warnings in console
  };

  onChange = event => {
    const { value } = event.target;
    this.setState({ text: value });
  };

  render() {
    return (
      <div>
        <h1>Here is our lobby</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.text}
            autoFocus
          ></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default LobbyContainer;
