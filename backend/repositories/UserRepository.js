const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;

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

    const accessToken = jwt.sign({ username: hashPass }, "secret");

    const newUser = this.model(userData);
    newUser.save();

    return res.json({
      status: 200,
      msg: "Success!",
      token: accessToken,
    });
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

    const accessToken = jwt.sign({ username: user.password }, "secret");

    return res.json({
      status: 200,
      msg: "Success!",
      token: accessToken,
      userId: user._id,
    });
  }

  async getLoggedUser(req, res) {
    const { userId } = req.query;
    const user = await this.model.findOne({ _id: ObjectId(userId) });
    const { username, email, role } = user;

    const loggedUserProps = { username, email, role, id: userId };

    res.json(loggedUserProps);
  }

  async getAllUsers(req, res) {
    const users = (await this.model.find()).map((user) => ({
      username: user.username,
      email: user.email,
      role: user.role,
      id: user._id,
    }));

    return res.json(users);
  }
}

module.exports = new UserRepository(User);
