const mongoose = require("mongoose");

const preBuildSchema = new mongoose.Schema({
  name: String,
  quoteType: String,
  quoteBudget: Number,
  buildFee: Number,
  quoteDate: Date,
  quoteCost: Number,
  componentNames: [String],
  componentPrices: [Number],
  componentCategories: [String],
  componentUrls: [String],
  componentDates: [String],
});

const Prebuild = mongoose.model("prebuilds", preBuildSchema);
module.exports = Prebuild;
