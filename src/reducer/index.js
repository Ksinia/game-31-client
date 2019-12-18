import { combineReducers } from "redux";
import user from "./auth";
import lobby from "./lobby";
import error from "./error";

export default combineReducers({
  user,
  lobby,
  error
});
