const express = require("express");
const Services = require("./services");
const services = new Services();
const app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://polla-rusa.auth0.com/.well-known/jwks.json"
  }),
  audience: "http://polla-rusa.club/",
  issuer: "https://polla-rusa.auth0.com/",
  algorithms: ["RS256"]
});
const port = process.env.PORT || 5000;

//app.use(jwtCheck);

app.set("port", port);

app.use(express.static("public"));
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


app.get("*", function(req, res) {
  res.redirect(req.url);
});

app.listen(port, () => console.log("listening on port 3000!"));
