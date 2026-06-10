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
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        err = { ...err, [key]: error.errors[key].message };
      });
    }
    res.status(422).json({ msg: "internal server error", error: err });
  }
};

const Login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    
    if (!user) {
      return res.status(422).json({ msg: "user name and password not found" });
    }
    const check = await bcrypt.compare(data.password, user.password);
    if (!check) {
      return res.status(422).json({ msg: "user name and password not found" });
    }

    const singData = {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
    };

    const token = jwt.sign(singData, process.env.secret, { expiresIn: "2d" });

    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ user: safeUser, token: token });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ msg: "user name and password not found" });
  }
};

module.exports = { Register, Login };
