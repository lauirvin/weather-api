"use strict";

const express = require("express");
const request = require("request");
const mongo = require("./mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

let apiKey = "f99334587bfae13103f9137ba216b156";
let city = "Hong Kong";
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

app.get("/weather", verifyToken, (req, res) => {
  jwt.verify(req.token, "key", (err, authData) => {
    if (err) {
      res.send("Authorization error");
    } else {
      request(url, (err, response, body) => {
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
          mongo.findData().then(weatherData => {
            res.json({
              authData,
              weatherData
            });
          });
        }
      });
    }
  });
});

app.get("/login", (req, res) => {
  // Sample user
  const user = {
    id: 1,
    username: "john",
    email: "johndoe@gmail.com"
  };

  jwt.sign({ user }, "key", (err, token) => {
    res.json({
      token: token
    });
  });
});

// HEADER FORMAT
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1]; // Set <access_token>
    req.token = bearerToken;
    next();
  } else {
    res.send("Token unavailable");
  }
}

app.get("/clearDB", (req, res) => {
  mongo.clearDB();
  mongo.findData();
});

app.get("/", (req, res) => {
  res.send("Welcome to Weather API");
});
