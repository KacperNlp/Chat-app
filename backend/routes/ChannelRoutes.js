const express = require("express");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

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

//get message
app.get("/messages", (req, res) => {
  repository
    .getAllMessagesForChannel(req)
    .then((messages) => res.json(messages))
    .catch((error) => console.log(error));
});

module.exports = app;
