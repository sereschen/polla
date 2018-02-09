const express = require("express");
const Services = require("./services");
const services = new Services();
const app = express();
const axios = require("axios");
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
        res.send(teams);
      },
      error => res.send(error)
    )
    .catch(error => console.log(error));
});

app.get("/update-teams", (req, res) => {
  services
    .getTeams()
    .then(teams => {
      var newteams = teams.map(team => {
        return axios
          .get("https://restcountries.eu/rest/v2/name/" + team.name)
          .then(res => {
            let data = res.data;
            if (data) {
              return {
                es: data[0].translations.es,
                _id: team._id,
                flag: data[0].flag,
                name: team.name
              };
            } else {
              return team;
            }
          })
          .catch(error => {
            console.log(error);
            throw error;
          });
      });
      Promise.all(newteams).then(results => {
        results.forEach(team => {
          services.updateTeam(team);
        });
        res.send("It Worked!");
      });
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
});

app.get("*", function(req, res) {
  res.redirect(req.url);
});

app.listen(port, () => console.log("listening on port 3000!"));
