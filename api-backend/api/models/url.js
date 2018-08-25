const mongoose = require("mongoose");
const shortid = require("shortid");

const urlsSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  siteId: {
    type: String,
    default: shortid.generate
  },
  creatorId: {
    type: String,
    require: true
  }
});
module.exports = mongoose.model("urls", urlsSchema);
