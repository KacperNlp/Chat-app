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

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hashSync(newUserData.password, salt);
    const userData = { ...newUserData };
    userData.password = hashPass;

    const newUser = this.model(userData);
    return newUser.save();
  }

  async loginUser(req, res) {
    const { username, password } = req.body;
    const user = await this.model.findOne({ username });

    if (!user) {
      return res.status(400).json({
        type: "username",
        msg: "This user is not exist!",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        type: "password",
        msg: "Password is incorrect",
      });
    }

    return res.json({
      status: 200,
      msg: "Success!",
    });
  }
}

module.exports = new UserRepository(User);
