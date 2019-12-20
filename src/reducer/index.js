import { combineReducers } from "redux";
import user from "./auth";
import lobby from "./lobby";
import error from "./error";
import score from "./score";

export default combineReducers({
  user,
  lobby,
  error,
  score
});
