import React, { Component } from "react";
import { connect } from "react-redux";
import { getMatches } from "../../actions";

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
      return (
        <li key={item._id}>
          {item._id}: {item.team1.name} vs {item.team2.name}
        </li>
      );
    });
    return <ul>{matchesList}</ul>;
  }
}
