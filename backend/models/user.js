const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Full name is require"],
  },
  email: {
    type: String,
    required: [true, "Email is require"],
  },
  password: {
    type: String,
    required: [true, "Password is require"],
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
