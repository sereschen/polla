import React, { Component } from "react";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {};
};

@connect(store => {
  return {
    matches: store.reducer.matches
  };
}, mapDispatchToProps)
export default class Home extends Component {
  render() {
    const { matches } = this.props;
    return <div>Hola</div>;
  }
}
