import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import superagent from "superagent";
import { url } from "../url";
import "./RoomDetailsPage.css";

class RoomDetailsPage extends Component {
  roomId = this.props.match.params.room;

  onClick = async event => {
    // when button name is join, we send current room id,
    // when button name is exit, we send room is as undefined
    let newRoomId = undefined;
    console.log(this.roomId);
    if (event.target.name === "join") {
      newRoomId = this.roomId;
    }
    if (event.target.name === "start") {
      console.log("request test: ", { roomId: this.roomId });
      try {
        const response = await superagent
          .put(`${url}/start`)
          .set("Authorization", `Bearer ${this.props.user.jwt}`)
          .send({ roomId: this.roomId });
        console.log("response test: ", response);
      } catch (error) {
        console.warn("error test:", error);
      }
    } else {
      try {
        const response = await superagent
          .put(`${url}/join`)
          .set("Authorization", `Bearer ${this.props.user.jwt}`)
          .send({ newRoomId });
        console.log("response test: ", response);
      } catch (error) {
        console.warn("error test:", error);
      }
    }
  };

  render() {
    const room = this.props.rooms.find(room => room.id == this.roomId);
    return (
      <div>
        {!this.props.user ? (
          this.props.history.push("/")
        ) : (
          <div>
            <h2>
              Welcome to {room.name}, {this.props.user.name}
            </h2>
            {room.users.find(user => user.id == this.props.user.id) && (
              <button name="exit" onClick={this.onClick}>
                Exit the game
              </button>
            )}
            {!room.users.find(user => user.id == this.props.user.id) &&
              room.users.length < room.maxPlayers && (
                <button name="join" onClick={this.onClick}>
                  Join the game
                </button>
              )}
            {room.users.find(user => user.id == this.props.user.id) &&
              room.users.length == room.maxPlayers && (
                <button name="start" onClick={this.onClick}>
                  Start game
                </button>
              )}
            <Link to="/">
              <button>Go back to the lobby</button>
            </Link>
            <div className="details">
              <div className="description2">
                {room.maxPlayers > room.users.length ? (
                  <p>Waiting for players</p>
                ) : (
                  <p>Ready for the game</p>
                )}
                <p>
                  {room.users.length} of {room.maxPlayers} players in the game
                </p>
              </div>
              <div className="players2">
                <p>Current players: </p>
                {room.users.length > 0 &&
                  room.users.map(user => {
                    return <p key={user.id}>{user.name}</p>;
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
function MapStateToProps(state) {
  return {
    user: state.user,
    rooms: state.lobby
  };
}
export default connect(MapStateToProps)(RoomDetailsPage);
