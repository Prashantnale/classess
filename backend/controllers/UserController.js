const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const Login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      res.json({ msg: "user name and password not found" });
    }
    const check = await bcrypt.compare(data.password, user.password);
    if (!check) {
      res.json({ msg: "user name and password not found" });
    }

    const singData = {
      id: user.id,
      full_name: user.full_name,
      email: user.mail,
    };

    const token = jwt.sign(singData, process.env.secret, { expiresIn: "2d" });

    const { password, ...safeUser } = user.dataValues;

    res.json({ user: safeUser, token: token });
  } catch (error) {
    return res.json({ msg: "user name and password not found" });
  }
};

module.exports = { Register, Login };
