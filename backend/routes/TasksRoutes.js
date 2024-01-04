const express = require("express");

const app = express.Router();
const repository = require("../repositories/TodoRepository");

// get all todo items in the db
app.get("/", (req, res) => {
  repository
    .findAll()
    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => console.log(error));
});

// add a todo item
app.post("/", (req, res) => {
  const { content } = req.body;
  repository
    .create(content)
    .then((todo) => {
      res.json(todo);
    })
    .catch((error) => console.log(error));
});

// delete a todo item
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  repository
    .deleteById(id)
    .then((ok) => {
      console.log(ok);
      console.log(`Deleted record with id: ${id}`);
      res.status(200).json([]);
    })
    .catch((error) => console.log(error));
});

//update a todo item
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const todo = { content: req.body.content, done: req.body.done };
  repository
    .updateById(id, todo)
    .then(res.status(200).json([]))
    .catch((err) => console.log(err));
});

module.exports = app;
