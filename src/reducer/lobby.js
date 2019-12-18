export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case "ALL_ROOMS": {
      return action.payload;
    }
    case "NEW_ROOM": {
      return [...state, action.payload];
    }
    case "UPDATED_ROOMS": {
      return state.map(room => {
        if (action.payload.newRoom && room.id == action.payload.newRoom.id) {
          return action.payload.newRoom;
        } else if (
          action.payload.oldRoom &&
          room.id == action.payload.oldRoom.id
        ) {
          return action.payload.oldRoom;
        } else {
          return room;
        }
      });
    }
    default:
      return state;
  }
}
