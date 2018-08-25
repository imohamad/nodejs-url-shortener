const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  confirmPassword: {
    type: String,
    require: true
  }
});
module.exports = mongoose.model("users", usersSchema);
