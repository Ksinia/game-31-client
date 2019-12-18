import superagent from "superagent";
import { url as baseUrl } from "./url";

const loginError = error => {
  return {
    type: "LOGIN_OR_SIGNUP_ERROR",
    payload: error
  };
};

export const loginSignupFunction = (
  type,
  name,
  password,
  push
) => async dispatch => {
  const url = `${baseUrl}/${type}`;
  try {
    const response = await superagent.post(url).send({ name, password });
    console.log("response test:", response);
    const action = JSON.parse(response.text);
    dispatch(action);
    // dispatch the action that there is no errors
    dispatch(loginError(null));
    /// HERE
    if (type === "signup") {
      push("/");
    }
  } catch (error) {
    console.log("error test:", error);
    console.log(error.response.body);
    dispatch(loginError(error.response.body));
  }
};
