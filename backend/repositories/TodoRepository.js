const Todo = require("../models/Todo");

class TodoRepository {
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

  findById(id) {
    return this.model.findById(id);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, {
      $set: { content: object.content, done: object.done },
    });
  }
}

module.exports = new TodoRepository(Todo);
