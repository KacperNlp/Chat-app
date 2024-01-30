const Channel = require("../models/Channel");

class ChannelRepository {
  constructor(model) {
    this.model = model;
  }

  create(content) {
    const newTodo = { content, done: false };
    const todo = new this.model(newTodo);

    return todo.save();
  }

  findAll() {
    return this.model.find();
  }
}

module.exports = new ChannelRepository(Channel);
