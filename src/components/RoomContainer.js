import React, { Component } from "react";
import { Link } from "react-router-dom";

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
    const { id, name, maxPlayers, users } = this.props.room;
    return (
      <Link to={`/room/${id}`}>
        <div style={{ background: `${this.state.color}` }}>
          <p>{name}</p>
          <p>Max players: {maxPlayers}</p>
          {users && users.length > 0 && (
            <ul>
              <p>Current players: </p>
              {users.map(user => {
                return <li key={user.id}>{user.name}</li>;
              })}
            </ul>
          )}
          {users &&
            (maxPlayers > users.length ? (
              <p>Waiting for players</p>
            ) : (
              <p>Ready for the game</p>
            ))}
        </div>
      </Link>
    );
  }
}

export default RoomContainer;
