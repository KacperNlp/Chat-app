const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async createNewUser(newUserData) {
    const { username, email } = newUserData;

    const isUserNameTaken = await this.model.findOne({ username });
    const isEmailNameTaken = await this.model.findOne({ email });

    if (isUserNameTaken) {
      throw new Error("This username is taken!");
    }

    if (isEmailNameTaken) {
      throw new Error("This e-mail is taken!");
    }

    const newUser = this.model(newUserData);
    return newUser.save();
  }
}

module.exports = new UserRepository(User);
