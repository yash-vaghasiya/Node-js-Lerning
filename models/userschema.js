const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  password: String,
});
const User = mongoose.model("entites", userSchema);

module.exports = User;
