const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: String,
  firstName: String,
  dobDay: Number,
  dobMonth: Number,
  dobYear: Number,
  showGender: Boolean,
  genderIdentity: String,
  genderInterest: String,
  email: String,
  password: String,
  url: String,
  about: String,
  activities: [String],
  matches: [{ userId: String }],
});

module.exports = mongoose.model("Users", userSchema);
