const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {type: String, require: true, trim: true},
  email: {type: String, require: true, trim: true,lowercase:true},
  password: {type: String, require: true, trim: true},
  tc: {type: Boolean, require: true}
});
const User = mongoose.model("entites", userSchema);

module.exports = User;
