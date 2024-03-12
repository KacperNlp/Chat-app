const mongoose = require("mongoose");

const { Schema } = mongoose;

const channelSchema = new Schema({
  name: {
    type: String,
  },
  img: {
    type: Buffer,
  },
  author: {
    type: String,
  },
  addedUsers: {
    type: Array,
  },
  messages: {
    type: Array,
  },
});

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
