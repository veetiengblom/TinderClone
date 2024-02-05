const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  userID: String,
  firstName: String,
  dobDay: Number,
  dobMonth: Number,
  dobYear: Number,
  showGender: Boolean,
  genderIdentity: String,
  genderInterest: String,
  email: String,
  url: String,
  about: String,
});

module.exports = mongoose.model("Users", userSchema);
