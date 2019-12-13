"use strict";

const express = require("express");
const request = require("request");
const mongo = require("./mongoose");

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

let apiKey = "f99334587bfae13103f9137ba216b156";
let city = "Hong Kong";
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

app.get("/weather", function(req, res) {
  request(url, function(err, response, body) {
    if (err) {
      // If OpenWweatherMap is down
      mongo.findData().then(results => {
        if (results.length === 0) {
          console.log("error:", error); // Log error message if no previous data is available
        } else {
          res.send(results); // Send previous data
        }
      });
    } else {
      mongo.insertData(JSON.parse(body)); // Insert data from API
      mongo.findData().then(results => {
        res.send(results); // Return data from DB to user
      });
    }
  });
});

app.get("/clearDB", function(req, res) {
  mongo.clearDB();
  mongo.findData();
});
