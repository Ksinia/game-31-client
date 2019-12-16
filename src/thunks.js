import superagent from "superagent";

const baseUrl = "http://game-31.herokuapp.com";

export const loginFunction = (name, password) => async dispatch => {
  const url = `${baseUrl}/login`;
  try {
    const response = await superagent.post(url).send({ name, password });
    const action = JSON.parse(response.text);
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};
