import superagent from "superagent";
import { url as baseUrl } from "./url";

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
    /// HERE
    if (type === "signup") {
      push("/");
    }
  } catch (error) {
    console.log("error test:", error);
    console.log(error.response.body);
  }
};
// export const signupFunction = (name, password) => async dispatch => {
//   const url = `${baseUrl}/signup`;
//   try {
//     const response = await superagent.post(url).send({ name, password });
//     const action = JSON.parse(response.text);
//     dispatch(action);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
