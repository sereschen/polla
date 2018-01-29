import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { routerMiddleware } from "react-router-redux";
import { hashHistory } from "react-router";

import reducer from "./reducers";

const middleware = applyMiddleware(
  promise(),
  thunk,
  //logger(),
  routerMiddleware(hashHistory)
);

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware
);
