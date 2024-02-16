const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let activityMatchesSchema = new Schema({
  userIds: [String],
  activities: [String],
});

module.exports = mongoose.model("ActivityMatches", activityMatchesSchema);