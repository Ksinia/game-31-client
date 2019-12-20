export default function reducer(state = null, action = {}) {
  switch (action.type) {
    case "SCORE": {
      return action.payload;
    }
    default:
      return state;
  }
}
