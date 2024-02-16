const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let activities = new Schema({});

module.exports = mongoose.model("Activities", activities);
