const mongoose = require("mongoose");

const { Schema } = mongoose;

const todoSchema = new Schema({
  content: {
    type: String,
  },
  done: {
    type: Boolean,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
