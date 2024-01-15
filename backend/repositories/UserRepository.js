const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async createNewUser(res, newUserData) {
    const { username, email } = newUserData;

    const isUserNameTaken = await this.model.findOne({ username });
    const isEmailNameTaken = await this.model.findOne({ email });

    if (isUserNameTaken) {
      return res.status(400).send({
        type: "username",
        msg: "This username is taken!",
      });
    }

    if (isEmailNameTaken) {
      return res.status(400).send({
        type: "email",
        msg: "This e-mail is taken!",
      });
    }

    const newUser = this.model(newUserData);
    return newUser.save();
  }

  async loginUser(req, res) {
    console.log(this);
    await this.model.findOne(req.body, function (err, user) {
      if (err) {
        return res.json({
          status: 0,
          message: err,
        });
      }

      if (!err) {
        return res.json({
          status: 0,
          message: "Not found!",
        });
      }

      return res.json({
        status: 200,
        id: user._id,
        message: "Success!",
      });
    });
  }
}

module.exports = new UserRepository(User);
