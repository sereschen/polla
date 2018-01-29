module.exports = function Services() {
  this.getMatches = getMatches;
  this.getTeams = getTeams;
};

function Mongo() {
  return new Promise(resolve => {
    const MongoClient = require("mongodb").MongoClient;
    let db = null;
    MongoClient.connect(
      "mongodb://sereschen:sergio316@ds115758.mlab.com:15758/polla",
      (err, database) => {
        if (err) throw err;
        db = database.db("polla");
        resolve(db);
      }
    );
  });
}

const getMatches = () => {
  return new Promise((resolve, reject) => {
    Mongo().then(db => {
      db
        .collection("matches")
        .aggregate()
        .lookup({ from: "teams", localField: "team1", foreignField: "_id", as: "team1" })
        .lookup({ from: "teams", localField: "team2", foreignField: "_id", as: "team2" })
        .unwind("$team1")
        .unwind("$team2")
        .toArray((err, matches) => {
          !err ? resolve(matches) : reject(err);
        });
    });
  });
};

const getTeams = () => {
  return new Promise((resolve, reject) => {
    Mongo().then(db => {
      db
        .collection("teams")
        .find()
        .toArray((err, teams) => {
          !err ? resolve(teams) : reject(err);
        });
    });
  });
};
