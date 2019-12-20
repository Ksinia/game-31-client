import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import superagent from "superagent";
import { url } from "../url";
import "./RoomDetailsPage.css";

class RoomDetailsPage extends Component {
  state = { giveCard: null, takeCard: null };

  roomId = this.props.match.params.room;

  onClick = async event => {
    // when button name is join, we send current room id,
    // when button name is exit, we send room is as null
    let newRoomId = null;
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

  giveCard = event => this.setState({ giveCard: event.target.name });
  takeCard = event => this.setState({ takeCard: event.target.name });

  swapCards = async () => {
    console.log(this.state.giveCard, this.state.takeCard);
    try {
      const response = await superagent
        .put(`${url}/turn`)
        .set("Authorization", `Bearer ${this.props.user.jwt}`)
        .send({
          roomId: this.roomId,
          discard: this.state.giveCard,
          pick: this.state.takeCard
        });
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
          <div className="game">
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
              room.phase == "ready" && (
                <button name="start" onClick={this.onClick}>
                  Start game
                </button>
              )}
            <Link to="/">
              <button>Go back to the lobby</button>
            </Link>
            <div className="details">
              <div className="description2">
                {room.phase == "waiting" && <p>Waiting for players</p>}
                {room.phase == "ready" && <p>Ready for the game</p>}
                {room.phase == "started" && <p>Game started</p>}
                {room.phase == "finished" && <p>Game finished</p>}
                <p>
                  {room.users.length} of {room.maxPlayers} players in the game
                </p>
              </div>
              <div className="players2">
                <p>Current players: </p>
                {room.users.length > 0 &&
                  room.users.map(user => {
                    return (
                      <p key={user.id} className="player-name">
                        {user.name}
                      </p>
                    );
                  })}
              </div>
            </div>
            {room.phase == "started" && (
              <section className="table">
                <div className="others">
                  {new Array(room.users.length - 1)
                    .fill(1)
                    .map((x, index, array) => {
                      return (
                        <div className="someone" key={index}>
                          {new Array(3).fill(1).map((x, index, array) => (
                            <img
                              key={index}
                              src={require("../images/red_back.png")}
                            />
                          ))}
                        </div>
                      );
                    })}
                </div>
                <p>Cards on the table:</p>
                <div className="pot">
                  {room.cards
                    .filter(card => {
                      return !card.userId;
                    })
                    .map(card => {
                      return (
                        <img
                          onClick={this.takeCard}
                          name={card.id}
                          key={card.id}
                          src={require(`../images/${card.cardObject.face}${card.cardObject.suit}.png`)}
                        />
                      );
                    })}
                </div>
                <p>Your cards:</p>
                <div className="hand">
                  {room.cards
                    .filter(card => {
                      return card.userId == this.props.user.id;
                    })
                    .map(card => {
                      return (
                        <img
                          onClick={this.giveCard}
                          name={card.id}
                          key={card.id}
                          src={require(`../images/${card.cardObject.face}${card.cardObject.suit}.png`)}
                        />
                      );
                    })}
                </div>
                <button onClick={this.swapCards}>Confirm</button>
              </section>
            )}
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
