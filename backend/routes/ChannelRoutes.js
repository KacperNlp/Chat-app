const express = require("express");

const app = express.Router();
const repository = require("../repositories/ChannelRepository");

// get all channels
app.get("/", (req, res) => {
  repository
    .findAll(req)
    .then((channels) => {
      res.json(channels);
    })
    .catch((error) => console.log(error));
});

// create new channel
app.post("/", (req, res) => {
  repository
    .create(req.body)
    .then((channel) => {
      res.json(channel);
    })
    .catch((error) => console.log(error));
});

module.exports = app;
