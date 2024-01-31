const mongoose = require("mongoose");

const { Schema } = mongoose;

const channelSchema = new Schema({
  name: {
    type: String,
  },
  color: {
    type: String,
  },
  author: {
    type: String,
  },
  addedUsers: {
    type: Array,
  },
});

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;