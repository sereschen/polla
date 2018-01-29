import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Router, Route, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Home from "./components/Home/Home";
import PollaNavbar from "./components/PollaNavbar/PollaNavbar";

const history = syncHistoryWithStore(hashHistory, store);

const app = document.getElementById("app");
ReactDOM.render(
  <div>
    <PollaNavbar />
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/about" component={null} />
      </Router>
    </Provider>
  </div>,
  app
);
