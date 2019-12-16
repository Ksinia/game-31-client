export default function reducer(state = null, action = {}) {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return action.payload;
    }
    default:
      return state;
  }
}
