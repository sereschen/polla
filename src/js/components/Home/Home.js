import React, { Component } from "react";
import { connect } from "react-redux";
import { getMatches } from "../../actions";
import Match from "../Match/Match";

const mapDispatchToProps = dispatch => {
  return {
    getMatches: () => {
      dispatch(getMatches());
    }
  };
};

@connect(store => {
  return {
    matches: store.reducer.matches
  };
}, mapDispatchToProps)
export default class Home extends Component {
  componentDidMount() {
    const { getMatches } = this.props;
    getMatches();
  }

  render() {
    const { matches } = this.props;
    const matchesList = matches.map(item => {
      return <Match key={item._id} match={item} />;
    });
    return <div>{matchesList}</div>;
  }
}
