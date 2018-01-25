const express = require("express");
const Services = require("./services");
const services = new Services();
const app = express();
const port = process.env.PORT || 5000;

app.set("port", port);

app.get("/matches", (req, res) => {
  console.log("It works");
  services
    .getMatches()
    .then(
      matches => {
        console.log(matches);
        res.send(matches);
      },
      error => res.send(error)
    )
    .catch(error => console.log(error));
});

app.get("/teams", (req, res) => {
  services
    .getTeams()
    .then(
      teams => {
        console.log(teams);
        res.send(teams);
      },
      error => res.send(error)
    )
    .catch(error => console.log(error));
});

app.get("/ranking", (req, res) => {
  let users = [];
  db
    .collection("users")
    .find()
    .toArray((err, items) => {
      return resolve => {
        resolve(items);
      };
    });
});
app.listen(port, () => console.log("listening on port 3000!"));
