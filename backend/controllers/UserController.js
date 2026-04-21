const User = require("../models/user");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  try {
    const data = req.body;
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashPassword });
    res.status(201).json({ user: user, msg: "user register successfully" });
  } catch (error) {
    var err = {};
    error.errors.forEach((element) => {
      err = { ...err, [element.path]: element.message };
    });
    res.status(422).json({ msg: "internal server errror", error: err });
  }
};

module.exports = { Register };
