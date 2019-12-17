import { combineReducers } from "redux";
import user from "./auth";
import lobby from "./lobby";

export default combineReducers({
  user,
  lobby
});
