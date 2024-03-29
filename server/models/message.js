const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let messageShema = new Schema(
  {
    fromUserId: String,
    toUserId: String,
    message: String,
    category: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", messageShema);
