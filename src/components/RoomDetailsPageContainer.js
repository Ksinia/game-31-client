import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import superagent from "superagent";
import { url } from "../url";

class RoomDetailsPageContainer extends Component {
  roomId = this.props.match.params.room;

  onClick = async event => {
    // when button name is join, we send current room id,
    // when button name is exit, we send room is as undefined
    console.log(event.target.name);
    let newRoomId = undefined;
    if (event.target.name == "join") {
      newRoomId = this.roomId;
    }
    try {
      const response = await superagent
        .put(`${url}/join`)
        .set("Authorization", `Bearer ${this.props.user.jwt}`)
        .send({ newRoomId });
      console.log("response test: ", response);
    } catch (error) {
      console.warn("error test:", error);
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
              Welcome to the room {this.roomId}, {this.props.user.name}
            </h2>
            {room.users.find(user => user.id == this.props.user.id) ? (
              <button name="exit" onClick={this.onClick}>
                Exit the game
              </button>
            ) : (
              <button name="join" onClick={this.onClick}>
                Join the game
              </button>
            )}
            <Link to="/">
              <button>Go back to the lobby</button>
            </Link>
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
export default connect(MapStateToProps)(RoomDetailsPageContainer);
