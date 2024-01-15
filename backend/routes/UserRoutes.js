const express = require("express");
const router = express.Router();
const repository = require("../repositories/UserRepository");

//middlewares
const userMiddleware = require("../middleware/user");

router.post("/login", (req, res) => repository.loginUser(req, res));

router.post("/register", userMiddleware.validateRegister, (req, res) => {
  repository
    .createNewUser(res, req.body)
    .then((todo) => {
      res.json(todo);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
