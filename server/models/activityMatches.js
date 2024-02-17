const mongoose = require("mongoose");
const activity = require("./activity");

const Schema = mongoose.Schema;

let activityMatchesSchema = new Schema({
  userId: String,
  withUserId: { userId: String, activity: [String] },
});

module.exports = mongoose.model("ActivityMatches", activityMatchesSchema);
