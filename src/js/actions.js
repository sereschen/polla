import axios from "axios";

export const actions = {
  GET_MATCHES: "GET_MATCHES"
};

export function getMatches() {
  return dispatch => {
    axios.get("/matches").then(res => {
      dispatch({ type: actions.GET_MATCHES, payload: res.data });
    });
  };
}
