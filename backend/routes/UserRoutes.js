const express = require("express");
const router = express.Router();
const repository = require("../repositories/UserRepository");

//middlewares
const userMiddleware = require("../middleware/user");

router.post("/login", (req, res) => {
  console.log("Login!");
});

router.post("/register", userMiddleware.validateRegister, (req, res) => {
  repository
    .createNewUser(req.body)
    .then((todo) => {
      res.json(todo);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
