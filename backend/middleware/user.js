module.exports = {
  validateRegister: (req, res, next) => {
    // username min length 3
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        type: "username",
        msg: "Please enter a username with min. 3 chars",
      });
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        type: "password",
        msg: "Please enter a password with min. 6 chars",
      });
    }
    // password (repeat) does not match
    if (
      !req.body.passwordRepeat ||
      req.body.password != req.body.passwordRepeat
    ) {
      return res.status(400).send({
        type: "passwordRepeat",
        msg: "Both passwords must match",
      });
    }
    next();
  },
};
