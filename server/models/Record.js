const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  quoteUserId: String,
  name: String,
  quoteType: String,
  quoteDate: Date,
  quoteCost: Number,
  componentNames: [String], 
  componentPrices: [Number], 
  componentCategories: [String], 
  componentUrls:[String],
  componentDates:[String],
});

const Record = mongoose.model('records', recordSchema);
module.exports = Record;