import React, { Component } from "react";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography/Typography";
import { withStyles } from "material-ui/styles";
import matches from "./Match.scss";
const styles = {
  card: {
    display: "flex",
    height: 200,
    margin: 20
  },
  media: {
    height: 200,
    width: 400
  }
};

class Match extends Component {
  render() {
    const { match, classes } = this.props;
    return <Card class={classes.card}>
        <CardMedia class={classes.media} image={match.team1.flag} title={match.team1.es} />
        <CardContent>
          <Typography align="center" type="headline" component="h2" gutterBottom={true}>
            {match._id}
          </Typography>
          <Typography align="center" component="p">
            {match.team1.es} vs {match.team2.es}
          </Typography>
        </CardContent>
        <CardMedia class={classes.media} image={match.team2.flag} title={match.team2.es} />
      </Card>;
  }
}

export default withStyles(styles)(Match);
