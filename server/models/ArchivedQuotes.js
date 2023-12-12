const mongoose = require('mongoose');

const archivedRecordSchema = new mongoose.Schema({
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
  quoteStatus: String,
});

const ArchivedRecord = mongoose.model('archivedRecords', archivedRecordSchema);

module.exports = ArchivedRecord;
