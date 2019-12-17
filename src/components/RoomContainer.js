import React, { Component } from "react";

class RoomContainer extends Component {
  state = {
    color: this.randomColor()
  };

  randomColor() {
    const colors = [
      "#6f6f76",
      "#91babc",
      "#a7b5c6",
      "#c09a99",
      "#784b47",
      "#d4b687"
    ];
    const rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
  }

  render() {
    return (
      <div style={{ background: `${this.state.color}` }}>
        <p>{this.props.room.name}</p>
        <p>Max players: {this.props.room.maxPlayers}</p>
        <p>Owner: {this.props.room.owner}</p>
        <p>Waiting for players</p>
        <p>In game</p>
        <button>Enter</button>
      </div>
    );
  }
}

export default RoomContainer;
