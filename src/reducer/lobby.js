export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case "ALL_ROOMS": {
      return action.payload;
    }
    case "NEW_ROOM": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
