const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  mobileNo: Number,
});
const User = mongoose.model("entites", userSchema);

module.exports = User;
