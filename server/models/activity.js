const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let activitySchema = new Schema({
  category: String,
  activity: [{ name: String }, { url: String }],
});

module.exports = mongoose.model("Activities", activitySchema);
