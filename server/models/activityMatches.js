const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let activityMatchesSchema = new Schema({
  userId: String,
  withUserId: {
    userId: String,    
    activity: [String] 
  },
});


module.exports = mongoose.model("ActivityMatches", activityMatchesSchema);
