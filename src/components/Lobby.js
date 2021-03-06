import React from "react";
import RoomTile from "./RoomTile";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { colors } from "../colors";

function Lobby(props) {
  const rooms = (
    <div className="rooms">
      {props.rooms.map(room => (
        <div className="room" key={room.id}>
          <RoomTile
            style={{ background: colors[room.id % colors.length] }}
            room={room}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1>Welcome to the lobby, {props.name}</h1>
      <p>Please create a new room or enter existing room.</p>
      <form onSubmit={props.onSubmit}>
        <label htmlFor="name">Please give your room a name: </label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={props.onChange}
          value={props.values.name}
        ></input>
        <label htmlFor="maxPlayers">
          {" "}
          Please specify the quantity of players (from 2 to 4):{" "}
        </label>
        <input
          id="maxPlayers"
          type="number"
          min="2"
          max="4"
          name="maxPlayers"
          onChange={props.onChange}
          value={props.values.maxPlayers}
        ></input>
        <button>Submit</button>
      </form>
      <div>{rooms}</div>
    </div>
  );
}

export default Lobby;
