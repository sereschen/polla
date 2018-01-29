import { actions } from "../actions";
const initialState = {
  matches: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_MATCHES: {
      return {
        ...state,
        matches: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
